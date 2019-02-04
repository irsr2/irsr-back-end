const express = require('express');
const helmet = require('helmet');
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
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/equipmentType', async (req, res) => {
  try {
    const status = await db('equipmentType');
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/users', async (req, res) => {
  try {
    const userRoles = await db
      .from('user')
      .select('*')
      .innerJoin('role', 'user.role', 'role.id');
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id')
      .innerJoin('schoolLog', 'equipment.id', 'schoolLog.equipmentID')
      .select()
      .where('equipment.broken', 1);
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Unable to get equipment.' });
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
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Unable to get that equipment ID.' });
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
    // console.log('types', types[0].equipmentId);
    // const resolvedIds = types.map(data => data.equipmentId);
    // let resolvedData = []
    // for (let i = 0; i < resolvedIds; i ++) {

    // }
    // console.log('resolved ids', resolvedIds);
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Unable to get that equipment ID.' });
  }
});

module.exports = router;
