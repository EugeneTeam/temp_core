exports.up = function (knex) {
  return knex.schema.createTable('authorizations_tokens', (table) => {
    table.uuid('user_uuid');
    table.foreign('user_uuid').references('uuid').inTable('users');
    table.string('token').notNullable();
    table.string('name').nullable();
    table.unique(['user_uuid', 'token']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authorizations_tokens');
};
