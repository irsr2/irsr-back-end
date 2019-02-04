exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('role')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('role').insert([
        { role: 'School Admin' },
        { role: 'Board Member' }
      ]);
    });
};
