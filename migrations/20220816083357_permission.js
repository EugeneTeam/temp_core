exports.up = function ({ schema }) {
  return schema.createTable('permissions', (table) => {
    table.uuid('uuid').primary();
    table.string('name', 100).unique().notNullable();
    table.string('description', 500).nullable();
  });
};

exports.down = function ({ schema }) {
  return schema.dropTable('permissions');
};
