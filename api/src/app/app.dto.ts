import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'メッセージ',
    example: 'Hello World!',
  })
  message: string;
}
