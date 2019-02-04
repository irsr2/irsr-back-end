exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('statusTypes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('statusTypes').insert([
        { statusID: 1, statusFromBoard: 'Done' },
        { statusID: 2, statusFromBoard: 'Scheduled' },
        { statusID: 3, statusFromBoard: 'Ignored' }
      ]);
    });
};
