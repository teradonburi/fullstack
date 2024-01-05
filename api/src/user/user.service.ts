import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (await this.userRepository.findByEmail(param.email)) {
      throw new ConflictException('email already exists');
    }

    const user = await this.userRepository.create({
      name: param.name,
      email: param.email,
      token: this.userRepository.generateToken(),
    });

    const newUser = await this.userRepository.update(getId(user), {
      password: this.userRepository.cipher(param.password, getId(user)),
    });

    return { name: newUser.name, token: user.token };
  }

  async login(param: UserLoginDto) {
    const user = await this.userRepository.findByEmail(param.email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const password = this.userRepository.cipher(param.password, getId(user));
    // compare hashed password
    if (user.password !== password) {
      throw new BadRequestException('email and password pair is wrong');
    }

    return { name: user.name, token: user.token };
  }
}
