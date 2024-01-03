import { Injectable } from '@nestjs/common';
import { AppLoginDto } from './app.dto';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello World!' };
  }
  login(param: AppLoginDto) {
    console.log(param);
  }
}
