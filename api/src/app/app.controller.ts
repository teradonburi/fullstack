import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppResponseDto } from './app.dto';

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
}
