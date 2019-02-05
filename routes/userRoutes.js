const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');
const responseStatus = require('./responseStatus');

router.get('/', authenticate, async (req, res) => {
  try {
    const userRoles = await db
      .from('user')
      .select(
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'role.role'
      )
      .innerJoin('role', 'user.role', 'role.id');
    res.status(responseStatus.success).json(userRoles);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const individualUser = await db
      .from('user')
      .select(
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'role.role'
      )
      .innerJoin('role', 'user.role', 'role.id')
      .where({ 'user.id': id });
    res.status(responseStatus.success).json(individualUser);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

module.exports = router;
