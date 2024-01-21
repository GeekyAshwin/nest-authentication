import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerfiyTokenMiddleware implements NestMiddleware {

  private db_token: string;
  constructor(private readonly prisma: PrismaService) {}
  use( req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    this.prisma.rememberUserToken.findFirst({
      where: {
        token: token
      }
    }).then((data) => {
      if (data) {
        this.db_token = data.token;
        log(token, this.db_token)
        if (token === this.db_token) {
          next();
        } else {
          throw new UnauthorizedException();
        }
      } else {
        return 'Invalid Bearer token.'
      }
      
    }).catch(() => {
      throw new UnauthorizedException('Invalid Bearer Token.');
    });
  }
} 
