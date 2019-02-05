exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', tbl => {
    tbl.increments();
    tbl.string('name', 45).notNullable();
    tbl.string('email', 50).notNullable();
    tbl.string('password', 25).notNullable();
    tbl.integer('role').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
