import knex from 'knex';
import Bookshelf from 'bookshelf';
import UUIDPlugin from 'bookshelf-uuid';

import CachePlugin from '../lib/Cache';
import redis from '../../../redis';

const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: { tableName: 'migrations' },
  debug: process.env.DATABASE_DEBUG === 'true',
};

/**
 * @type {Bookshelf}
 */
const bookshelf = Bookshelf(knex(config));

bookshelf.plugin(CachePlugin, { redis });
bookshelf.plugin(UUIDPlugin);

export default bookshelf;
