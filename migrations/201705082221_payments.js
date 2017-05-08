
module.exports.up = async (db) => {
  // PostgreSQL extensions (may require superuser or database owner priveleges)
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('payments', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('sale_id').notNullable()
      .references('id').inTable('sales')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table.string('type_id', 20).notNullable();
    table.uuid('ref_id');
    table.decimal('value').notNullable();
    table.integer('installments');
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('payments');
};

module.exports.configuration = { transaction: true };
