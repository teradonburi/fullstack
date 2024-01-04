import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserLoginDto, UserSignupDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiOperation({
    operationId: 'example signup api',
    description: 'signup api',
  })
  signup(@Body(new ValidationPipe()) body: UserSignupDto) {
    return this.userService.signup(body);
  }

  @Post('/login')
  @ApiOperation({
    operationId: 'example login api',
    description: 'login api',
  })
  login(@Body(new ValidationPipe()) body: UserLoginDto) {
    return this.userService.login(body);
  }
}
