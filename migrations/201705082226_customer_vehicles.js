module.exports.up = async (db) => {
  await db.schema.createTable('customer_vehicles', (table) => {
    table.uuid('customer_id').notNullable()
      .references('id').inTable('customers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.uuid('vehicle_id').notNullable()
      .references('id').inTable('vehicles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.primary(['customer_id', 'vehicle_id']);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('customer_vehicles');
};

module.exports.configuration = { transaction: true };
