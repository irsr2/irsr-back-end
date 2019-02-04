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

router.get('/statusTypes', async (req, res) => {
  try {
    const status = await db('statusTypes');
    res.status(responseStatus.success).json(status);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/equipmentType', async (req, res) => {
  try {
    const status = await db('equipmentType');
    res.status(responseStatus.success).json(status);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id')
      .innerJoin('schoolLog', 'equipment.id', 'schoolLog.equipmentID')
      .innerJoin('user', 'schoolLog.user', 'user.id')
      .select()
      .where('equipment.broken', 1);
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get equipment.' });
  }
});

router.get('/singlePage/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const types = await db
      .from('equipment')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id')
      .innerJoin('schoolLog', 'equipment.id', 'schoolLog.equipmentID')
      .innerJoin('boardLog', 'equipment.id', 'boardLog.equipmentId')
      .innerJoin('statusTypes', 'boardLog.status', 'statusTypes.statusID')
      .innerJoin('user', 'boardLog.boardUser', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .select()
      .where({ 'equipment.id': id });
    if (types.length === 0) {
      res.status(responseStatus.badRequest).json('Please enter a valid ID.');
    } else {
      res.status(responseStatus.success).json(types);
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get that equipment ID.' });
  }
});

router.get('/resolved', async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id')
      .innerJoin('schoolLog', 'equipment.id', 'schoolLog.equipmentID')
      .innerJoin('boardLog', 'equipment.id', 'boardLog.equipmentId')
      .innerJoin('statusTypes', 'boardLog.status', 'statusTypes.statusID')
      .innerJoin('user', 'boardLog.boardUser', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .select()
      .where({ statusID: 1 });
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get that equipment ID.' });
  }
});

module.exports = router;
