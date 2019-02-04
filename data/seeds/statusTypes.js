exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('statusTypes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('statusTypes').insert([
        { statusID: 1, type: 'Done' },
        { statusID: 2, type: 'Scheduled' },
        { statusID: 3, type: 'Ignored' }
      ]);
    });
};
