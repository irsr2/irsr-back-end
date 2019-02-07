// const request = require('supertest');
// const express = require('express');
// const db = require('../data/dbConfig');
// const otherRoutes = require('../routes/otherRoutes');

// afterEach(async () => {
//   await db('equipment').truncate();
// });

// describe('Equipment table', () => {
//   it('Should insert provided equipment', async () => {
//     const newEquip = await otherRoutes.insert({
//       type: 2,
//       broken: false,
//       equipmentImage: 'uploads/1549470979089hdmi.jpeg'
//     });
//     const allEquip = await otherRoutes.getAll();
//     console.log('NEW E', newEquip);
//     console.log('All equip', allEquip);
//     done();
//   });
// });
