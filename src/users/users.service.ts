import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {

  }
  signUp(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({data});
  }

  login(email: string, password: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        email: email,
        password: password
      }
    });
  }

  async saveToken(data: Prisma.RememberUserTokenCreateInput) {
    return await this.prisma.rememberUserToken.create({data});
  }
}