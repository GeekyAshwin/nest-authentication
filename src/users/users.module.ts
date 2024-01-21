import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { VerfiyTokenMiddleware } from 'src/middlewares/verfiy-token/verfiy-token.middleware';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret_key_for_jwt',    // TODO:  use .env file
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService],
})
export class UsersModule {
  
}
