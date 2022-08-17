exports.up = function (knex) {
  return knex.schema.createTable('authorizationsTokens', (table) => {
    table.uuid('userUuid');
    table.foreign('userUuid').references('uuid').inTable('users');
    table.string('token').notNullable();
    table.string('name').nullable();
    table.unique(['userUuid', 'token']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authorizationsTokens');
};
