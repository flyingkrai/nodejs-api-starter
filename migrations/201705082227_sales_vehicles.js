module.exports.up = async (db) => {
  await db.schema.createTable('sales_vehicles', (table) => {
    table.uuid('sale_id').notNullable()
      .references('id').inTable('sales')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.uuid('vehicle_id').notNullable()
      .references('id').inTable('vehicles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.primary(['sale_id', 'vehicle_id']);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('sales_vehicles');
};

module.exports.configuration = { transaction: true };
