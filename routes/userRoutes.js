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
    const userRoles = await db
      .from('user')
      .select('*')
      .innerJoin('role', 'user.role', 'role.id');
    res.status(responseStatus.success).json(userRoles);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const individualUser = await db
      .from('user')
      .select('*')
      .innerJoin('role', 'user.role', 'role.id')
      .where({ 'user.id': id });
    res.status(responseStatus.success).json(individualUser);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

module.exports = router;
