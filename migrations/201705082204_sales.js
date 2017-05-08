module.exports.up = async (db) => {
  // PostgreSQL extensions (may require superuser or database owner priveleges)
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('sales', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('customer_id').notNullable()
      .references('id').inTable('customers')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table.uuid('salesman_id').notNullable()
      .references('id').inTable('salesmen')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');
    table.decimal('date').notNullable();
    table.string('observations');
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(db.fn.now());
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('sales');
};

module.exports.configuration = { transaction: true };
