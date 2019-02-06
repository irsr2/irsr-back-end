exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipment')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('equipment').insert([
        {
          type: 1,
          broken: false,
          equipmentImage: 'uploads/1549471080160TV.jpg'
        },
        {
          type: 1,
          broken: false,
          equipmentImage: 'uploads/1549471156180server.jpeg'
        },
        {
          type: 3,
          broken: false,
          equipmentImage: 'uploads/1549471074378router.jpg'
        },
        {
          type: 5,
          broken: true,
          equipmentImage: 'uploads/1549471064845tablet.jpeg'
        },
        {
          type: 2,
          broken: false,
          equipmentImage: 'uploads/1549470979089hdmi.jpeg'
        },
        {
          type: 4,
          broken: true,
          equipmentImage: 'uploads/1549470745121chromebook.jpg'
        }
      ]);
    });
};
