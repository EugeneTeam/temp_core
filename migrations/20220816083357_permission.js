exports.up = function (knex) {
  return knex.schema.createTable('permissions', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())')).notNullable();
    table.string('name', 100).unique().notNullable();
    table.string('description', 500).nullable();
  });
};

exports.down = function ({ schema }) {
  return schema.dropTable('permissions');
};
