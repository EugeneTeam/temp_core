exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table
      .uuid('uuid')
      .index()
      .primary()
      .defaultTo(knex.raw('(UUID())'))
      .notNullable();
  });
};

exports.down = function (knex) {};
