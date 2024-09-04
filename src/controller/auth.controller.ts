import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { userDto } from 'src/dto/createUser.dto';
import { loginDto } from 'src/dto/login.dto';
import { AuthService } from 'src/service/auth.service';
// import { globalResponse } from 'src/config/response.config';

@Controller('auth')
export class authcontroller {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body() createUser: userDto, @Res() res: Response) {
    const registerInfo = await this.authService.register(createUser);
    return res.status(registerInfo.statusCode).json(registerInfo);
  }
  @Post('login')
  async login(@Body() loginUser: loginDto, @Res() res: Response) {
    const loginInfo = await this.authService.login(loginUser);
    return res.status(loginInfo.statusCode).json(loginInfo);
  }
}
