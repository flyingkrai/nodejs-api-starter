module.exports.up = async (db) => {
  // PostgreSQL extensions (may require superuser or database owner priveleges)
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('salesmen', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('code');
    table.string('name');
    table.string('cellphone', 20);
    table.string('type_id', 20).notNullable();
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(db.fn.now());
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('salesmen');
};

module.exports.configuration = { transaction: true };
