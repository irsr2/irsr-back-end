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
          equipmentImage: 'uploads/2019-02-05T21:49:11.499ZTV.jpg'
        },
        {
          type: 1,
          broken: false,
          equipmentImage: 'uploads/2019-02-05T21:55:46.502Zserver.jpeg'
        },
        {
          type: 3,
          broken: false,
          equipmentImage: 'uploads/2019-02-05T21:56:35.738Zrouter.jpg'
        },
        {
          type: 5,
          broken: true,
          equipmentImage: 'uploads/2019-02-05T21:57:28.087Ztablet.jpeg'
        },
        {
          type: 2,
          broken: false,
          equipmentImage: 'uploads/2019-02-05T21:58:18.980Zhdmi.jpeg'
        },
        {
          type: 4,
          broken: true,
          equipmentImage: 'uploads/2019-02-05T21:59:05.612Zchromebook.jpg'
        }
      ]);
    });
};
