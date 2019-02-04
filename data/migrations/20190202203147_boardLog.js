exports.up = function(knex, Promise) {
  return knex.schema.createTable('boardLog', tbl => {
    tbl.increments();
    tbl.integer('equipmentId').notNullable();
    tbl.integer('status').notNullable();
    tbl
      .integer('boardUser')
      .references('id')
      .inTable('user')
      .notNullable();
    tbl.string('boardComment');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('boardLog');
};
