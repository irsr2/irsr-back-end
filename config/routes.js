require('dotenv').config();

const axios = require('axios');
const bcrypt = require('bcrypt');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  //   server.post('/api/login', login);
  //   server.get('/api/', authenticate, getEquipment);
};

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '600m'
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  console.log("We're in register!");
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 12);
  userInfo.password = hash;
  db('users')
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
}

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

// function getEquipment(req, res) {
//   const requestOptions = {
//     headers: { accept: 'application/json' }
//   };
//   axios
//     .get('http://localhost:5000/', requestOptions)
//     .then(response => {
//       res.status(200).json(response.data.results);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Equipment', error: err });
//     });
// }
