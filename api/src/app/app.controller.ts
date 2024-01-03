import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppLoginDto, AppResponseDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    operationId: 'example api',
    description: 'response test message',
  })
  @ApiOkResponse({ description: 'Returns Hello World!', type: AppResponseDto })
  getHello(): AppResponseDto {
    return this.appService.getHello();
  }

  @Post('/login')
  @ApiOperation({
    operationId: 'example login api',
    description: 'login api',
  })
  login(@Body() body: AppLoginDto) {
    return this.appService.login(body);
  }
}
