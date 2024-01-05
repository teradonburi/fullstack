import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONNECTION_NAME } from '../connection';
import * as crypto from 'crypto';

import { User, UserDocument } from '../models/user.model';
import { ObjectId } from 'mongodb';

@Injectable()
class UserRepository {
  constructor(
    @InjectModel(User.name, CONNECTION_NAME)
    private userModel: Model<UserDocument>,
  ) {}

  generateToken() {
    const length = 32;
    const chars =
      'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789_-';
    const rnd = crypto.randomBytes(length);
    const ret = [];
    for (let i = 0; i < length; i++) {
      ret.push(chars[rnd[i] % chars.length]);
    }
    return ret.join('');
  }

  cipher(password: string, id: string) {
    return crypto.pbkdf2Sync(password, id, 96, 32, 'sha512').toString('hex');
  }

  async findByEmail(email: string) {
    return await this.userModel.exists({ email }).exec();
  }

  async findByToken(token: string) {
    return await this.userModel
      .findOne({
        token,
        deactivate: { $ne: true },
      })
      .exec();
  }

  async create(body: Partial<User>) {
    return await this.userModel.create(body);
  }

  async update(id: ObjectId | string, body: Partial<User>) {
    return await this.userModel.findByIdAndUpdate(id, { $set: body }).exec();
  }
}

export { UserRepository };
