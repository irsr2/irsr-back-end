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

router.get('/', async (req, res) => {
  try {
    const logJoined = await db
      .from('schoolLog')
      .select('*')
      .innerJoin('equipmentType', 'schoolLog.equipmentID', 'equipmentType.id')
      .innerJoin('user', 'schoolLog.user', 'user.id')
      .innerJoin('role', 'user.role', 'role.id');
    res.status(200).json(logJoined);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('schoolLog').insert(req.body);
    console.log('req body =', req.body);
    res.status(201).json(`Added new log with is ${ids}`);
  } catch (error) {
    console.log('ERROR', error);
  }
});

module.exports = router;
