require('dotenv').config();

const express = require('express');
const router = express.Router();

const axios = require('axios');
const bcrypt = require('bcrypt');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

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
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;
    db('user')
      .insert(userInfo)
      .then(ids => {
        res.status(201).json(ids);
      });
  } catch (error) {
    res.status(201).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const creds = req.body;
    const user = await db('user')
      .where({ email: creds.email })
      .first();
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.name}`, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to complete this request.' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const requestOptions = {
      headers: { accept: 'application/json' }
    };
    const homePageRes = await axios.get(
      'http://localhost:5000/',
      requestOptions
    );
    res.status(200).json(homePageRes.data);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Unable to get equipment.' });
  }
});

module.exports = router;
