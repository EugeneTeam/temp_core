exports.up = function (knex) {
  return knex.schema.createTable('galleries', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name', 100).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('galleries');
};
