import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchemaModule } from 'src/models/user.model';

@Module({
  imports: [UserSchemaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
