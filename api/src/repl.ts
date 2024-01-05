import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import * as dayjs from 'dayjs';
import * as mongoose from 'mongoose';

import * as repl from 'repl';

import { AppModule } from 'src/app/app.module';
import { DBConnection } from './connection';

const HISTORY_DIRECTORY = __dirname + '/.ym_history';

const libraries = {
  dayjs: dayjs,
};

const mongo = {
  connection: null,
  connect: async (uri, options) => {
    // make options mutable by spreading to delete unsupported option
    // the options [connectionName] is not supported
    const copiedOptions = { ...options };
    delete copiedOptions.connectionName;

    mongo.connection = await mongoose.connect(uri, copiedOptions);
    return mongo.connection;
  },
  close: async () => {
    if (mongo.connection) {
      await mongo.connection.disconnect();
    }
  },
};

mongo
  .connect(
    config.get<string>('mongodb.uri'),
    config.get<any>('mongodb.options'),
  )
  .then(async () => {
    const nestApp = await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    });
    await nestApp.init();

    console.log('REPL with async/await and mongoose! 🐍');
    const replInstance = repl.start({ prompt: '> ' });
    replInstance.setupHistory(HISTORY_DIRECTORY, (err) => {
      if (err) console.log(err);
    });

    // lib
    Object.keys(libraries).forEach((key) => {
      replInstance.context[key] = libraries[key];
    });

    // model
    const dbConnection = nestApp.get(DBConnection);
    const models = dbConnection.getConnection().models;
    for (const name in models) {
      replInstance.context[name] = models[name];
    }

    replInstance.on('exit', async () => {
      await mongo.close();
    });
  });
