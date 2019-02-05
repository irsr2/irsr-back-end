exports.up = function(knex, Promise) {
  return knex.schema.createTable('equipment', tbl => {
    tbl.increments();
    tbl
      .integer('type')
      .references('id')
      .inTable('equipmentType')
      .notNullable();
    tbl.string('equipmentImage');
    tbl.boolean('broken').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('equipment');
};
