import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserLoginDto, UserSignupDto, UserResponseDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ErrorDTO } from 'src/error.dto';

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
  @ApiOkResponse({ description: 'Returns user', type: UserResponseDto })
  @ApiConflictResponse({ description: 'email already exists', type: ErrorDTO })
  async signup(@Body(new ValidationPipe()) body: UserSignupDto) {
    return await this.userService.signup(body);
  }

  @Post('/login')
  @ApiOperation({
    operationId: 'example login api',
    description: 'login api',
  })
  @ApiOkResponse({ description: 'Returns user', type: UserResponseDto })
  @ApiNotFoundResponse({
    description: 'user not found',
    type: ErrorDTO,
  })
  @ApiBadRequestResponse({
    description: 'email and password pair is wrong',
    type: ErrorDTO,
  })
  async login(@Body(new ValidationPipe()) body: UserLoginDto) {
    return await this.userService.login(body);
  }
}
