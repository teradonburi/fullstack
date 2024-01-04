import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { UserRepository } from '../user/user.repository';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
