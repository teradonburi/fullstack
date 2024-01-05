import { Injectable } from '@nestjs/common';
import * as math from 'mathjs';

@Injectable()
export class AppService {
  getHello() {
    const result = math.evaluate('sin(45 deg) ^ 2');
    return { message: 'Hello World!', result };
  }
}
