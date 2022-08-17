exports.up = function (knex) {
  return knex.schema.createTable('user_details', (table) => {
    table.uuid('user_uuid');
    table.foreign('user_uuid').references('uuid').inTable('users');
    table.string('name', 100).notNullable();
    table.string('surname', 100).notNullable();
    table.string('middle_name', 100).nullable();
    table.date('birthday').nullable();
    table.string('phone', 15).notNullable();
    table.uuid('city_uuid').nullable().defaultTo(null);
    table.foreign('city_uuid').references('uuid').inTable('cities');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_details');
};
