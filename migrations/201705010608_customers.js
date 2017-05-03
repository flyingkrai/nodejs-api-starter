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

  await db.schema.createTable('customers', (table) => {
    // UUID v1mc reduces the negative side effect of using random primary keys
    // with respect to keyspace fragmentation on disk for the tables because it's time based
    // https://www.postgresql.org/docs/current/static/uuid-ossp.html
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('email').notNullable().unique();
    table.string('name');
    table.string('company');
    table.string('occupation');
    table.string('cpf');
    table.string('rg');
    table.string('phone', 50);
    table.string('cellphone', 50);
    table.uuid('address_id');
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(db.fn.now());
    table.foreign('address_id').references('address.id');
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('users');
  await db.schema.dropTableIfExists('address');
};

module.exports.configuration = { transaction: true };
