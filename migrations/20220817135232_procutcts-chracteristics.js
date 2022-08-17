exports.up = function (knex) {
  return knex.schema.createTable('products_characteristics', (table) => {
    table.uuid('product_uuid');
    table.foreign('product_uuid').references('uuid').inTable('products');

    table.uuid('characteristic_uuid');
    table
      .foreign('characteristic_uuid')
      .references('uuid')
      .inTable('characteristics');

    table.unique(['product_uuid', 'characteristic_uuid']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products_characteristics');
};
