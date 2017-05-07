module.exports.up = async (db) => {
  // PostgreSQL extensions (may require superuser or database owner priveleges)
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('vehicles', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('brand').notNullable();
    table.string('model').notNullable();
    table.string('plate', 8).unique().notNullable();
    table.string('year', 5).notNullable();
    table.string('color');
    table.string('fuel');
    table.string('renavam');
    table.string('chassi').notNullable();
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(db.fn.now());
  });

  await db.schema.createTable('vehicles_price_history', (table) => {
    table.string('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.decimal('value').notNullable();
    table.uuid('vehicle_id').notNullable();
    table.foreign('vehicle_id').references('vehicles.id');
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('vehicles_price_history');
  await db.schema.dropTableIfExists('vehicles');
};

module.exports.configuration = { transaction: true };
