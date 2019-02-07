require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');
const responseStatus = require('./responseStatus');

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '45m'
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', async (req, res) => {
  try {
    const userInfo = req.body;
    const emailMatches = await db.from('user').select('user.email').where({ 'user.email' : userInfo.email });
    const nameMatches = await db.from('user').select('user.name').where({ 'user.name' : userInfo.name });

    if (emailMatches.length > 0) {
      res.status(responseStatus.badRequest).json({
        message:
          'That email already exists. Please login or use a different email.'
      });
      return;
    }

    if (nameMatches.length > 0) {
      res.status(responseStatus.badRequest).json({
        message:
          'That username already exists. Please login or use a different username.'
      });
      return;
    }
    
    userInfo.password = bcrypt.hashSync(userInfo.password, 12);

    db('user')
        .insert(userInfo)
        .then(ids => {
          res.status(responseStatus.postCreated).json(ids);
        });
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const creds = req.body;
    const user = await db('user')
      .where({ email: creds.email })
      .innerJoin('role', 'user.role', 'role.id')
      .first();
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(responseStatus.success).json({ token, user });
    } else {
      res
        .status(responseStatus.unauthorized)
        .json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ message: 'Unable to complete this request.' });
  }
});

module.exports = router;
