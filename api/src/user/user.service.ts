import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { UserLoginDto, UserSignupDto } from './user.dto';
import { getId } from 'src/lib/objectId';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async show(token: string) {
    return await this.userRepository.findByToken(token);
  }

  async signup(param: UserSignupDto) {
    const user = await this.userRepository.create({
      name: param.name,
      email: param.email,
      token: this.userRepository.generateToken(),
    });

    const newUser = await this.userRepository.update(user._id, {
      password: this.userRepository.cipher(param.password, getId(user)),
    });

    return newUser;
  }

  login(param: UserLoginDto) {
    console.log(param);
  }
}
