exports.up = function (knex) {
  return knex.schema.createTable('userDetails', (table) => {
    table.uuid('userUuid');
    table.foreign('userUuid').references('uuid').inTable('users');
    table.string('name', 100).notNullable();
    table.string('surname', 100).notNullable();
    table.string('middleName', 100).nullable();
    table.date('birthday').nullable();
    table.string('phone', 15).notNullable();
    table.uuid('cityUuid').nullable().defaultTo(null);
    table.foreign('cityUuid').references('uuid').inTable('cities');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('userDetails');
};
