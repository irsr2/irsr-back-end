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

// module.exports = server => {
//   server.post('/api/register', register);
//   //   server.post('/api/login', login);
//   //   server.get('/api/jokes', authenticate, getJokes);
// };

function generateToken(user) {
  console.log('TOKEN GEN');
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

// router.post('/login', async (req, res) => {
//   const creds = req.body;
//   console.log('CREDS', creds);
//   db('user')
//     .where({ name: creds.name })
//     .first()
//     .then(user => {
//       console.log('USER', user);
//       console.log('COMPARE', bcrypt.compareSync('password', 'password'));
//       if (user && bcrypt.compareSync(creds.password, user.password)) {
//         const token = generateToken(user);
//         console.log('TOKEN', token);
//         res.status(200).json({ message: `Welcome ${user.name}`, token });
//       } else {
//         res.status(401).json({ message: 'Invalid username or password.' });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// });

router.post('/login', async (req, res) => {
  try {
    const creds = req.body;
    console.log('CREDS', creds);
    const user = await db('user')
      .where({ email: creds.email })
      .first();
    console.log('USER', user);
    const password = 'password';
    console.log('COMPARE', bcrypt.compareSync(password, password));
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      console.log('TOKEN', token);
      res.status(200).json({ message: `Welcome ${user.name}`, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to complete this request.' });
  }
});

module.exports = router;

// function login(req, res) {
//   const creds = req.body;
//   db('users')
//     .where({ username: creds.username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(creds.password, user.password)) {
//         const token = generateToken(user);
//         res.status(200).json({ message: `Welcome ${user.username}`, token });
//       } else {
//         res.status(401).json({ message: 'You shall not pass!' });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// }

// function getJokes(req, res) {
//   const requestOptions = {
//     headers: { accept: 'application/json' }
//   };
//   axios
//     .get('https://icanhazdadjoke.com/search', requestOptions)
//     .then(response => {
//       res.status(200).json(response.data.results);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Jokes', error: err });
//     });
// }
