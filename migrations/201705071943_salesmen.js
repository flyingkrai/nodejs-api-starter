module.exports.up = async (db) => {
  // PostgreSQL extensions (may require superuser or database owner priveleges)
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('salesmen_type', (table) => {
    table.string('id', 10).notNullable().primary();
    table.string('title').notNullable();
  });

  await db.schema.createTable('salesmen', (table) => {
    table.string('id', 4).comment('ID = salesman CODE').notNullable().primary();
    table.string('name');
    table.string('cellphone', 15);
    table.string('type_id').notNullable()
      .references('id').inTable('salesmen_type')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(db.fn.now());
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('salesmen');
  await db.schema.dropTableIfExists('salesmen_type');
};

module.exports.configuration = { transaction: true };
