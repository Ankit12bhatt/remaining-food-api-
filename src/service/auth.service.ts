import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userInfo } from 'os';
import { globalResponse } from 'src/config/response.config';
import { userDto } from 'src/dto/createUser.dto';
import { isUser, isUserInfo } from 'src/interface/user.interface';
import { user } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name) private userModel: Model<isUser>,
    @InjectModel(userInfo.name) private userInfoModel: Model<isUserInfo>,
    private jwtService: JwtService,
  ) {}
  async register(userDto: userDto): Promise<globalResponse<null>> {
    const { email, password, role, contact, name, city } = userDto;
    const result = await this.userModel.findOne({ email });
    if (result) {
      return new globalResponse<null>(
        HttpStatus.CONFLICT,
        false,
        'user Already Exist',
        null,
      );
    }
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const newUser = await this.userModel.create({
      role,
      email,
      password: hash,
    });
    const newUserInfo = await this.userInfoModel.create({
      user: newUser._id,
      name,
      contact,
      city,
    });
    if (newUserInfo) {
      return new globalResponse<null>(
        HttpStatus.CREATED,
        true,
        'User Registered',
        null,
      );
    }
    return new globalResponse<null>(
      HttpStatus.BAD_REQUEST,
      false,
      'Some problem occured',
      null,
    );
  }
  async login(login: loginDto): Promise<globalResponse<string | null>> {
    const { email, password } = login;
    const userDetail = await this.userModel.findOne({ email });
    if (!userDetail) {
      return new globalResponse<string | null>(
        HttpStatus.NOT_FOUND,
        false,
        'user not found',
        null,
      );
    }
    const validPassword = await bcrypt.compare(password, userDetail.password);
    if (!validPassword) {
      return new globalResponse<string | null>(
        HttpStatus.UNAUTHORIZED,
        false,
        'invalid password',
        null,
      );
    }
    const paylod = { id: userDetail._id, role: userDetail.role };
    const token = await this.jwtService.signAsync(paylod, {
      secret: process.env.SECRET_KEY,
    });
    return new globalResponse<string | null>(
      HttpStatus.OK,
      true,
      'logged in successful',
      token,
    );
  }
}
