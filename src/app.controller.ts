import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from 'console';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private usersService: UsersService, private jwtService: JwtService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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
