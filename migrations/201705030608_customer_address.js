module.exports.up = async (db) => {
  await db.schema.createTable('customer_address', (table) => {
    table.uuid('customer_id').notNullable()
      .references('id').inTable('customers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.uuid('address_id').notNullable()
      .references('id').inTable('address')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.primary(['customer_id', 'address_id']);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('customer_address');
};

module.exports.configuration = { transaction: true };
