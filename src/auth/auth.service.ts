import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUserByEmail(registerDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    return await this.usersService.createUser(registerDto);
  }
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email, true);
    if(!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException('Wrong password!', HttpStatus.UNAUTHORIZED);
    }
    const accessToken =  this.jwtService.sign({ 
      sub: user.id,
      email: user.email
    });
    return { 
      access_token : accessToken 
    };
  }
}