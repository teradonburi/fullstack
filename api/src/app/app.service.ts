import { Injectable } from '@nestjs/common';
import * as math from 'mathjs';
import * as jsonLogic from 'json-logic-js';

@Injectable()
export class AppService {
  getHello() {
    const mathResult = math.evaluate('sin(45 deg) ^ 2');
    const logicResult = jsonLogic.apply({
      and: [{ '>': [3, 1] }, { '<': [1, 3] }],
    });
    return { message: 'Hello World!', mathResult, logicResult };
  }
}
