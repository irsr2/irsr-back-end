const db = require('../data/dbConfig');

describe('Equipment table', () => {
  it('Should insert provided equipment', async () => {
    const equipment = await db.from('equipment');
    expect(equipment.length).toBe(6);
  });
});
