import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { log } from "console";
import { CreateUserDto } from "./users/dto/create-user.dto";
import { UsersService } from "./users/users.service";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("signup")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post("login")
  async login(@Req() request) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: request.body.credential,
      audience:
        "277584570296-4vvfks97khb076pav1hbqfrj16o4ghu1.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const loggedIn = this.usersService.signInWithGoogle(payload);
    if (loggedIn) {
      const response = {
        status: true,
        message: "Logged in successfully.",
        token: "Bearer " + request.body.credential,
      };
      return response;
    }
    //   return await this.usersService.login(email, password).then((data) => {
    //     if (data === null) {
    //       throw new UnauthorizedException();
    //     } else {
    //       const payload = {sub: data.id, username: data.name};

    //       return payload;
    //     }
    //   }).catch((error) => {
    //     log('error');
    //   });
  }
}
