exports.up = function (knex) {
  return knex.schema.createTable('images', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())'));
    table.integer('order').notNullable();
    table.string('name', 100).notNullable();
    table.string('url').notNullable();
    table.uuid('gallery_uuid');
    table.foreign('gallery_uuid').references('uuid').inTable('galleries');

    table.unique(['order', 'gallery_uuid']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('images');
};
