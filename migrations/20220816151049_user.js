exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table
      .uuid('uuid')
      .index()
      .primary()
      .defaultTo(knex.raw('(UUID())'))
      .notNullable();
    table.enu('status', ['ACTIVE', 'INACTIVE', 'BANNED']).defaultTo('INACTIVE');
    table.string('activation_token').notNullable();
    table.string('password_hash').nullable();
    table.string('reset_password_token').nullable();
    table.uuid('role_uuid');
    table.foreign('role_uuid').references('uuid').inTable('roles');
  });
};

exports.down = function (knex) {
  return knex.dropTable('users');
};
