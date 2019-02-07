const request = require('supertest');
const express = require('express');
const db = require('../data/dbConfig');
const equipment = require('../routes/equipmentRoutes');

const app = express();

describe('Equipment table', () => {
  it('Should insert provided equipment', async () => {
    const equipment = await db.from('equipment');
    expect(equipment.length).toBe(6);
  });
});
