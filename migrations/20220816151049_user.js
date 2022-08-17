exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table
      .uuid('uuid')
      .index()
      .primary()
      .defaultTo(knex.raw('(UUID())'))
      .notNullable();
    table.enu('status', ['ACTIVE', 'INACTIVE', 'BANNED']).defaultTo('INACTIVE');
    table.string('activationToken').notNullable();
    table.string('passwordHash').nullable();
    table.string('resetPasswordToken').nullable();
    table.uuid('roleUuid');
    table.foreign('roleUuid').references('uuid').inTable('roles');
  });
};

exports.down = function (knex) {
  return knex.dropTable('users');
};
