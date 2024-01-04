import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  MongoDefault,
  generateSchema,
  generateSchemaModule,
} from 'src/lib/mongo';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  token: string;
}

type UserVirtuals = {
  image: string;
};

export type UserType = User & MongoDefault & UserVirtuals;
export type UserDocument = HydratedDocument<UserType>;
export const UserSchema = generateSchema(User);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ token: 1 });

export const UserSchemaModule = generateSchemaModule(User.name, UserSchema);
