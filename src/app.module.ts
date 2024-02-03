import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { VerfiyTokenMiddleware } from './middlewares/verfiy-token/verfiy-token.middleware';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,    
  ],
  controllers: [AppController ],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(VerfiyTokenMiddleware)
    //   .forRoutes('');
  }
}
