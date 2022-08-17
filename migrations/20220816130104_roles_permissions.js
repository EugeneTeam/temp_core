exports.up = function (knex) {
  return knex.schema.createTable('roles_permissions', (table) => {
    table.uuid('permissionUuid').notNullable();
    table.foreign('permissionUuid').references('uuid').inTable('permissions');

    table.uuid('roleUuid').notNullable();
    table.foreign('roleUuid').references('uuid').inTable('roles');

    table.unique(['roleUuid', 'permissionUuid']);
  });
};

exports.down = function ({ schema }) {
  return schema.dropTable('roles_permissions');
};
