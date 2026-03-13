import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { errorResponse, successResponse } from 'src/helpers/responseFunctions';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { TblPlace } from '../tbl-places/entities/tbl-place.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private jwtService: JwtService,
  ) { }

  async registerUser(registerUserDto: RegisterUserDto) {

    try {

      const hash = await bcrypt.hash(registerUserDto.password, 10);
      registerUserDto.password = hash;

      const newUser = await this.userRepository.create(registerUserDto as any);

      return successResponse(HttpStatuses.CREATED, newUser, 'user registered successfully');

    } catch (error) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'register error', error);
    }
  }


  async login(loginUserDto: LoginUserDto) {
    try {
      const { phone, password } = loginUserDto;

      const existUser = await this.userRepository.findOne({
        where: { phone },
        include: [
          {
            model: TblPlace,
            as: 'place',
            attributes: ['name']
          }
        ]
      });
      if (!existUser) return errorResponse(HttpStatuses.NOT_FOUND, 'User not found');
      const isPasswordValid = await bcrypt.compare(password, existUser.password);
      if (!isPasswordValid) return errorResponse(HttpStatuses.UNAUTHORIZED, 'Invalid credentials');

      const payload = { user_guid: existUser.guid, user_phone: existUser.phone, user_role: existUser.role };
      const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
      const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '30d' });
      await existUser.update({ refresh_token: refreshToken });

      return successResponse(HttpStatuses.OK, { user_data: existUser, access_token: accessToken, refresh_token: refreshToken }, 'Login successful');

    } catch (error: any) {
      console.error('Login error:', error);
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'login failure ');
    }
  }

  async logout(user: User) {
    try {
      const existUser = await this.userRepository.findOne({ where: { guid: user.guid } });
      if (!existUser) return errorResponse(HttpStatuses.NOT_FOUND, 'User not found');

      await existUser.update({ refresh_token: '' });
      return successResponse(HttpStatuses.OK, '', 'User logged out successfully');
    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'logout error', error);
    }
  }

  async refreshToken(sentRefreshToken: string, user: User) {
    try {
      const existUser = await this.userRepository.findOne({ where: { guid: user.guid } });
      if (!existUser) return errorResponse(HttpStatuses.NOT_FOUND, 'User not found');

      let payload: any;
      try {
        payload = this.jwtService.verify(sentRefreshToken);
      } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
          return errorResponse(HttpStatuses.UNAUTHORIZED, 'Refresh token expired');
        }
        throw err;
      }

      const { exp, iat, ...restPayload } = payload;

      const newAccessToken = await this.jwtService.signAsync(restPayload, { expiresIn: '7d' });
      const newRefreshToken = await this.jwtService.signAsync(restPayload, { expiresIn: '30d' });

      await existUser.update({ refresh_token: newRefreshToken });

      return successResponse(HttpStatuses.OK, { access_token: newAccessToken, refresh_token: newRefreshToken }, 'Token refreshed successfully');
    } catch (error) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'Refresh token error', error);
    }
  }

  async deleteUser(user_guid: string) {
    try {
      const existUser = await this.userRepository.findOne({ where: { guid: user_guid } });
      if (!existUser) return errorResponse(HttpStatuses.NOT_FOUND, 'User not found');

      await existUser.destroy();
      return successResponse(HttpStatuses.OK, '', 'User deleted successfully');
    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'delete user error', error);
    }
  }
}