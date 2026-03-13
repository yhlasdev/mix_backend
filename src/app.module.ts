import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TblDocumentsModule } from './modules/tbl-documents/tbl-documents.module';
import { TblPlacesModule } from './modules/tbl-places/tbl-places.module';
import { SubDocumentsModule } from './modules/sub-documents/sub-documents.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UploadModule } from './modules/upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    UploadModule,
    AuthModule,
    TblDocumentsModule,
    TblPlacesModule,
    SubDocumentsModule,
    UserModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
