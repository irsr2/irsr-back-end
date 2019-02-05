const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');

const responseStatus = {
  success: 200,
  postCreated: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500
};

router.get('/', authenticate, async (req, res) => {
  try {
    const logJoined = await db
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
      .innerJoin('statusTypes', 'boardLog.status', 'statusTypes.statusID');
    res.status(responseStatus.success).json(logJoined);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const logJoined = await db
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
      .where({ 'boardLog.id': id });
    if (logJoined.length === 0) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'Please enter a valid ID.' });
    } else {
      res.status(responseStatus.success).json(logJoined);
    }
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const ids = await db('boardLog').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json({ message: `Added board log with id ${ids}` });
  } catch (error) {
    if (error.errno === 19) {
      res
        .status(responseStatus.badRequest)
        .json({ message: "You haven't entered the required information." });
    } else {
      res.status(responseStatus.serverError).json(error);
    }
  }
});

module.exports = router;
