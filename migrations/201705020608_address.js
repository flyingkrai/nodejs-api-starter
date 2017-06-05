module.exports.up = async (db) => {
  // PostgreSQL extensions (may require superuser or database owner priveleges)
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('address', (table) => {
    // UUID v1mc reduces the negative side effect of using random primary keys
    // with respect to keyspace fragmentation on disk for the tables because it's time based
    // https://www.postgresql.org/docs/current/static/uuid-ossp.html
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('zipcode', 9).notNullable();
    table.string('place').notNullable();
    table.string('number', 10).notNullable();
    table.string('complement');
    table.string('neighbor').notNullable();
    table.string('city').notNullable();
    table.string('state', 2).notNullable();
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(db.fn.now());
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('address');
};

module.exports.configuration = { transaction: true };
