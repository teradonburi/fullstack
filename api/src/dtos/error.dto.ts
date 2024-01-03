import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ErrorDetail {
  constructor(error) {
    if (!error) return;
    if (typeof error === 'string') {
      this.message = error;
    } else {
      this.code = error.code;
      this.message = error.message;
      this.resource = error.resource;
      this.field = error.field;
    }
  }

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'エラー詳細コード文字列',
  })
  code?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'エラー詳細メッセージ',
  })
  message: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'エラーが発生したリソース名',
  })
  resource?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'エラーが発生したフィールド名',
  })
  field?: string;
}

const statusCodeErrorMap = {
  [HttpStatus.BAD_REQUEST]: {
    code: 'bad_request',
    message: 'Bad Request',
  },
  [HttpStatus.UNAUTHORIZED]: {
    code: 'unauthorized',
    message: 'Unauthorized',
  },
  [HttpStatus.FORBIDDEN]: {
    code: 'forbidden',
    message: 'Forbidden',
  },
  [HttpStatus.NOT_FOUND]: {
    code: 'not_found',
    message: 'Not Found',
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    code: 'internal_server_error',
    message: 'Internal Server Error',
  },
  [HttpStatus.BAD_GATEWAY]: {
    code: 'bad_gateway',
    message: 'Bad Gateway',
  },
  [HttpStatus.SERVICE_UNAVAILABLE]: {
    code: 'service_unavailable',
    message: 'Service Unavailable',
  },
  [HttpStatus.GATEWAY_TIMEOUT]: {
    code: 'gateway_timeout',
    message: 'Gateway Timeout',
  },
} as const;

const createErrorDetails = (errors) => {
  return (errors || [])
    .map((e) => {
      return typeof e === 'string' || e.message ? new ErrorDetail(e) : null;
    })
    .filter((v) => v);
};

class Error {
  constructor(error) {
    if (Array.isArray(error)) {
      this.details = createErrorDetails(error);
    } else if (typeof error === 'string') {
      this.message = error;
    } else if (error) {
      if (error.code) {
        this.code = error.code;
      }
      if (error.details) {
        this.details = error.details;
      }
      if (error.message) {
        if (Array.isArray(error.message)) {
          this.details = createErrorDetails(error.message);
        } else if (typeof error.message === 'string') {
          this.message = error.message;
        } else if (typeof error.message === 'object') {
          const newError = new Error({
            statusCode: error.statusCode,
            ...error.message,
          });
          this.code = this.code || newError.code;
          this.message = this.message || newError.message;
          this.details = this.details || newError.details;
        }
      }
    }

    const errorFromStatus = statusCodeErrorMap[error?.statusCode] || {
      code: 'unexpected_error',
      message: 'Unexpected Error',
    };

    this.code = this.code || errorFromStatus.code;
    this.message = this.message || errorFromStatus.message;
    this.details = this.details || [];
  }

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'この Object の種別。ここでは必ず error が入ります。',
    example: 'error',
  })
  object: 'error';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'エラーコード文字列',
  })
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'エラーメッセージ',
  })
  message: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({
    description: 'エラー詳細 Object の配列',
  })
  details: ErrorDetail[];
}

export { ErrorDetail as ErrorDetailDTO, Error as ErrorDTO };
