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
    const logJoined = await db
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
      .innerJoin('role', 'user.role', 'role.id');
    res.status(responseStatus.success).json(logJoined);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const logJoined = await db
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
      .where({ 'schoolLog.id': id });
    if (logJoined.length === 0) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'Please enter a valid ID.' });
    } else {
      res.status(responseStatus.success).json(logJoined);
    }
  } catch (error) {
    console.log('Err', error);
    res.status(responseStatus.serverError).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('schoolLog').insert(req.body);
    res.status(responseStatus.postCreated).json(`Added new log with is ${ids}`);
  } catch (error) {
    if (error.errno === 19) {
      res
        .status(responseStatus.badRequest)
        .json("You haven't entered the required information.");
    } else {
      res.status(responseStatus.serverError).json(error);
    }
  }
});

module.exports = router;
