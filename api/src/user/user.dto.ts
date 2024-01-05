import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'test name',
  })
  name: string;

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

export class UserLoginDto {
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

export class UserResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'test name',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'token',
    example: 'auth token',
  })
  token: string;
}
