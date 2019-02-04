exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipment')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('equipment').insert([
        { type: 1, broken: false },
        { type: 1, broken: false },
        { type: 3, broken: false },
        { type: 5, broken: true },
        { type: 2, broken: false },
        { type: 4, broken: true }
      ]);
    });
};
