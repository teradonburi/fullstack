import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserLoginDto, UserSignupDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('bearer'))
  async show(@Request() req) {
    return await this.userService.show(req.user);
  }

  @Post('/signup')
  @ApiOperation({
    operationId: 'example signup api',
    description: 'signup api',
  })
  async signup(@Body(new ValidationPipe()) body: UserSignupDto) {
    return await this.userService.signup(body);
  }

  @Post('/login')
  @ApiOperation({
    operationId: 'example login api',
    description: 'login api',
  })
  async login(@Body(new ValidationPipe()) body: UserLoginDto) {
    return await this.userService.login(body);
  }
}
