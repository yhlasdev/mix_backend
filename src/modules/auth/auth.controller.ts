import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { errorResponse } from 'src/helpers/responseFunctions';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User) private readonly userRepository: typeof User
  ) { }

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }


  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Post('/logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.user);
  }

  @Post('/refresh-token')
  async refreshToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) return errorResponse(HttpStatuses.UNAUTHORIZED, 'No authorization header');
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return errorResponse(HttpStatuses.UNAUTHORIZED, 'Invalid authorization header');
    }

    const refreshToken = parts[1];

    const existUser = await this.userRepository.findOne({ where: { refresh_token: refreshToken } });
    if (!existUser) return errorResponse(HttpStatuses.UNAUTHORIZED, 'Invalid refresh token');

    return this.authService.refreshToken(refreshToken, existUser);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Delete('/delete-account')
  async deleteUser(@Req() req: any) {
    return this.authService.deleteUser(req.user.user_guid);
  }
}