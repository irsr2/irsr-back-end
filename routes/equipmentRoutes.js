const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const responseStatus = {
  success: 200,
  postCreated: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500
};

router.get('/', async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .select('*')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id');
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const singleEquipment = await db('equipment').where({ id });
    res.status(responseStatus.success).json(singleEquipment);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get that piece of equipment.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const { id } = req.params;
    const myUpdate = await db('equipment')
      .where({ id })
      .update(changes);
    console.log('Changes', changes);
    console.log('my update', myUpdate);
    res.status(responseStatus.success).json(myUpdate);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to update that piece of equipment.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await db('equipment')
      .where({ id })
      .delete();
    res.status(responseStatus.success).json(deleteResponse);
  } catch (error) {
    console.log('Err', error);
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to delete that equipment.' });
  }
});

module.exports = router;
