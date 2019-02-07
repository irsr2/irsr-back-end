exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('boardLog')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('boardLog').insert([
        { equipmentId: 1, status: 1, boardUser: 2 },
        { equipmentId: 3, status: 2, boardUser: 2 },
        {
          equipmentId: 4,
          status: 3,
          boardUser: 2,
          boardComment: 'Insufficient budget to fix item'
        }
      ]);
    });
};
