exports.up = function(knex, Promise) {
  return knex.schema.createTable('role', tbl => {
    tbl.increments();
    tbl.string('role', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('role');
};
