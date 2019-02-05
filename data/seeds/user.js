exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        { name: 'Dave', password: 'password', role: 1 },
        { name: 'John', password: 'password', role: 2 },
        { name: 'Steve', password: 'password', role: 1 }
      ]);
    });
};
