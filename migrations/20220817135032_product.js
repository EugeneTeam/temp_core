exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())'));
    table.string('title', 100).notNullable();
    table.decimal('price', 2).notNullable();
    table.string('vendor_code', 10).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
