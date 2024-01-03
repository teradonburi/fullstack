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

export class AppLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'email',
    example: 'text@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'password',
    example: 'TODO: password hash at server side',
  })
  password: string;
}
