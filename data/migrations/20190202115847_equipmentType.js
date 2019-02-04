exports.up = function(knex, Promise) {
  return knex.schema.createTable('equipmentType', tbl => {
    tbl.increments();
    tbl.string('type', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('equipmentType');
};
