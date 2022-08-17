exports.up = function (knex) {
  return knex.schema.createTable('roles_permissions', (table) => {
    table.uuid('permission_uuid').notNullable();
    table.foreign('permission_uuid').references('uuid').inTable('permissions');

    table.uuid('role_uuid').notNullable();
    table.foreign('role_uuid').references('uuid').inTable('roles');

    table.unique(['role_uuid', 'permission_uuid']);
  });
};

exports.down = function ({ schema }) {
  return schema.dropTable('roles_permissions');
};
