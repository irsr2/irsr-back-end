exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        { name: 'Dave', role: 1 },
        { name: 'John', role: 2 },
        { name: 'Steve', role: 1 }
      ]);
    });
};
