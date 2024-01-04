import { Type } from '@nestjs/common';
import {
  DiscriminatorOptions,
  MongooseModule,
  SchemaFactory,
} from '@nestjs/mongoose';
import * as config from 'config';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import { mongooseLeanVirtuals } from 'mongoose-lean-virtuals';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export const setSchemaOptions = <S extends mongoose.Schema>(schema: S): S => {
  schema.plugin(mongooseLeanVirtuals);
  schema.plugin(mongooseLeanDefaults);
  schema.plugin(aggregatePaginate);

  const leanOptions = { defaults: true, virtuals: true };
  schema.pre('find', function () {
    void this.setOptions({ lean: leanOptions });
  });
  schema.pre('findOne', function () {
    void this.setOptions({ lean: leanOptions });
  });

  schema.pre('updateOne', async function (next) {
    void this.setOptions({ runValidators: true });
    return next();
  });
  schema.pre('updateMany', async function (next) {
    void this.setOptions({ runValidators: true });
    return next();
  });

  schema.pre('findOneAndUpdate', async function (next) {
    void this.setOptions({
      runValidators: true,
      new: true,
      lean: leanOptions,
    });
    return next();
  });

  schema.pre('findOneAndDelete', async function (next) {
    void this.setOptions({
      runValidators: true,
      lean: leanOptions,
    });
    return next();
  });

  return schema;
};

export interface MongoDefault {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const generateSchema = <T>(model: Type<T>) =>
  SchemaFactory.createForClass(model);

export const generateSchemaModule = (
  name: string,
  schema: mongoose.Schema,
  discriminators?: DiscriminatorOptions[],
  connection = 'mongodb.options.connectionName',
) =>
  MongooseModule.forFeatureAsync(
    [
      {
        name,
        useFactory: () => setSchemaOptions(schema),
        discriminators,
      },
    ],
    config.get(connection),
  );
