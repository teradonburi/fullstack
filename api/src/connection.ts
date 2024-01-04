import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as config from 'config';
import { ClientSession, Connection } from 'mongoose';
import * as mongoose from 'mongoose';

// Enable debug mode for mongodb query
const DEBUG = !!process.env.DEBUG;
export const CONNECTION_NAME = config.get('mongodb.options.connectionName');

@Injectable()
export class DBConnection {
  constructor(
    @InjectConnection(CONNECTION_NAME)
    private connection: Connection,
  ) {
    console.log(`marketing pf connect to ${this.connection.db.databaseName}`);

    if (DEBUG) {
      mongoose.set('debug', true);
    }

    console.log('[mongoose] Connecting mongoose with options', {
      options: this.connection.config,
    });
  }

  getConnection() {
    return this.connection;
  }

  withTransaction = async <T>(
    cb: (session: ClientSession) => Promise<T>,
    session?: ClientSession,
  ): Promise<T> => {
    // Reuse the same session in nested `withTransaction` calls
    if (session) {
      return await cb(session);
    }

    session = await this.connection.startSession();

    let result: T;

    try {
      // Let mongodb's `withTransaction` handle `start/commit`. We still want to keep our own wrapper to handle things like re-using a session in nested `withTransaction` calls
      await session.withTransaction(async (session) => {
        result = await cb(session);
      });
    } finally {
      // No await needed here. I'm not sure why, but this function is not async.
      session.endSession();
    }

    return result;
  };
}
