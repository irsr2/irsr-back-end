exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schoolLog')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('schoolLog').insert([
        { equipmentID: 1, broken: false, user: 1, comment: 'Dropped it' },
        { equipmentID: 3, broken: false, user: 1 },
        { equipmentID: 4, broken: true, user: 1, comment: 'Liquid damage' },
        { equipmentID: 6, broken: true, user: 1 }
      ]);
    });
};
