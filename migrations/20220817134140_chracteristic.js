exports.up = function (knex) {
  return knex.schema.createTable('characteristics', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name', 100).notNullable();
    table.string('value', 100).notNullable();
    table.string('description', 500).nullable();
    table.string('filter', 200).nullable();
    table.uuid('type_uuid');
    table
      .foreign('type_uuid')
      .references('uuid')
      .inTable('characteristic_types');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('characteristics');
};
