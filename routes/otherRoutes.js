const express = require('express');
const router = express.Router();

const [knex, knexConfig] = [require('knex'), require('../knexfile')];
const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');

const responseStatus = require('./responseStatus');

router.get('/statusTypes', authenticate, async (req, res) => {
  try {
    const status = await db('statusTypes');
    res.status(responseStatus.success).json(status);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/equipmentType', authenticate, async (req, res) => {
  try {
    const status = await db('equipmentType');
    res.status(responseStatus.success).json(status);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id')
      .innerJoin('schoolLog', 'equipment.id', 'schoolLog.equipmentID')
      .innerJoin('user', 'schoolLog.user', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .select(
        'equipmentType.id',
        'equipment.id',
        'equipmentType.type',
        'equipment.equipmentImage',
        'equipment.broken',
        'user.name',
        'user.email',
        'role.role'
      )
      .where('equipment.broken', 1);
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get equipment.' });
  }
});

router.get('/singlePage/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await db
      .from('equipment')
      .select()
      .where({ 'equipment.id': id });
    const boardLog = await db
      .from('boardLog')
      .select(
        'boardLog.id',
        'boardLog.equipmentID',
        'boardLog.status',
        'boardLog.boardUser',
        'boardLog.boardComment',
        'boardLog.created_at',
        'equipmentType.type',
        'user.name',
        'role.role'
      )
      .innerJoin('equipmentType', 'boardLog.equipmentID', 'equipmentType.id')
      .innerJoin('user', 'boardLog.boardUser', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .where({ 'boardLog.equipmentID': id });
    const schoolLog = await db
      .from('schoolLog')
      .select(
        'schoolLog.id',
        'schoolLog.equipmentID',
        'schoolLog.broken',
        'schoolLog.user',
        'schoolLog.comment',
        'schoolLog.created_at',
        'equipmentType.type',
        'user.name',
        'role.role'
      )
      .innerJoin('equipmentType', 'schoolLog.equipmentID', 'equipmentType.id')
      .innerJoin('user', 'schoolLog.user', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .where({ 'schoolLog.equipmentID': id });
    if (equipment.length === 0) {
      res.status(responseStatus.badRequest).json('Please enter a valid ID.');
    } else {
      res
        .status(responseStatus.success)
        .json({ equipment, boardLog, schoolLog });
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get that equipment ID.' });
  }
});

router.get('/resolved', authenticate, async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id')
      .innerJoin('schoolLog', 'equipment.id', 'schoolLog.equipmentID')
      .innerJoin('boardLog', 'equipment.id', 'boardLog.equipmentId')
      .innerJoin('statusTypes', 'boardLog.status', 'statusTypes.statusID')
      .innerJoin('user', 'boardLog.boardUser', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .select(
        'equipment.id',
        'equipmentType.type',
        'equipment.broken',
        'schoolLog.equipmentID',
        'role.role'
      )
      .where({ statusID: 1 });
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to complete that request.' });
  }
});

module.exports = router;
