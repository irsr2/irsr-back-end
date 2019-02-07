exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schoolLog')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('schoolLog').insert([
        { equipmentId: 1, broken: false, user: 1, comment: 'Dropped it' },
        { equipmentId: 3, broken: false, user: 1 },
        { equipmentId: 4, broken: true, user: 1, comment: 'Liquid damage' },
        { equipmentId: 6, broken: true, user: 1 }
      ]);
    });
};
