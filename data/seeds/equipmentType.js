exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipmentType')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('equipmentType').insert([
        { type: 'TV' },
        { type: 'Server' },
        { type: 'Router' },
        { type: 'Tablet' },
        { type: 'HDMI Cables' },
        { type: 'Chromebook' }
      ]);
    });
};
