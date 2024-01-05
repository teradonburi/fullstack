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
  @ApiOperation({
    operationId: 'loadUser',
    description: 'load user',
  })
  @ApiOkResponse({ description: 'Returns user', type: UserResponseDto })
  async show(@Request() req): Promise<UserResponseDto> {
    return req.user;
  }

  @Post('/signup')
  @ApiOperation({
    operationId: 'signup',
    description: 'signup user',
  })
  @ApiOkResponse({ description: 'Returns user', type: UserResponseDto })
  @ApiConflictResponse({ description: 'email already exists', type: ErrorDTO })
  async signup(
    @Body(new ValidationPipe()) body: UserSignupDto,
  ): Promise<UserResponseDto> {
    return await this.userService.signup(body);
  }

  @Post('/login')
  @ApiOperation({
    operationId: 'login',
    description: 'login user',
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
  async login(
    @Body(new ValidationPipe()) body: UserLoginDto,
  ): Promise<UserResponseDto> {
    return await this.userService.login(body);
  }
}
