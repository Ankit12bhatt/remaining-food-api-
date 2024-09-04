import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { authcontroller } from 'src/controller/auth.controller';
import { user, userSchema } from 'src/schema/user.schema';
import { userInfo, userInfoSchema } from 'src/schema/userInfo.schema';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      { name: user.name, schema: userSchema },
      { name: userInfo.name, schema: userInfoSchema },
    ]),
  ],
  controllers: [authcontroller],
  providers: [AuthService],
})
export class AuthModule {}
