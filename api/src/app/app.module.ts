import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { Connection } from 'mongoose';
import { DBConnection } from 'src/connection';
import { UserModule } from 'src/user/user.module';
import { BearerStrategy } from 'src/auth/bearer.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('mongodb.uri'), {
      ...config.get('mongodb.options'),
      autoIndex: process.env.NODE_ENV !== 'production',
    }),
    // modules
    PassportModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: DBConnection,
      useFactory: (connection: Connection) => {
        return new DBConnection(connection);
      },
      inject: [
        getConnectionToken(config.get('mongodb.options.connectionName')),
      ],
    },
    // auth
    BearerStrategy,
    // services
    AppService,
  ],
})
export class AppModule {}
