exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        {
          name: 'Dave',
          email: 'dave@gmail.com',
          password: 'password',
          role: 1
        },
        {
          name: 'John',
          email: 'john@gmail.com',
          password: 'password',
          role: 2
        },
        {
          name: 'Steve',
          email: 'steve@gmail.com',
          password: 'password',
          role: 1
        }
      ]);
    });
};
