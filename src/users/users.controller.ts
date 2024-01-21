import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { create } from 'domain';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return await this.usersService.login(email, password).then((data) => {
      if (data === null) {
        throw new UnauthorizedException();
      } else {
        const payload = {sub: data.id, username: data.name};
        return this.jwtService.signAsync(payload, {secret: 'secret_value'}).then((data) => {
          const token = 'Bearer ' + data;
          this.usersService.saveToken({email, token});
          return token;
          
        });
      }
    }).catch((error) => {
      log('error');
    });
    
  }


}
