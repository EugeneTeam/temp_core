exports.up = function (knex) {
  return knex.schema.createTable('products_galleries', (table) => {
    table.uuid('gallery_uuid').notNullable();
    table.foreign('gallery_uuid').references('uuid').inTable('galleries');

    table.uuid('product_uuid').notNullable();
    table.foreign('product_uuid').references('uuid').inTable('products');

    table.unique(['product_uuid', 'gallery_uuid']);
  });
};

exports.down = function ({ schema }) {
  return schema.dropTable('products_galleries');
};
