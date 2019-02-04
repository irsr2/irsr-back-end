exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', tbl => {
    tbl.increments();
    tbl.string('name', 255).notNullable();
    tbl.integer('role');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
