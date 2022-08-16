exports.up = function ({ schema }) {
  return schema.createTable('roles_permissions', (table) => {
    table
      .uuid('permissionUuid')
      .references('uuid')
      .inTable('permissions')
      .notNullable();
    table.uuid('roleUuid').references('uuid').inTable('roles').notNullable();
    table.unique(['roleUuid', 'permissionUuid'])
  });
};

exports.down = function ({ schema }) {
  return schema.dropTable('roles_permissions');
};
