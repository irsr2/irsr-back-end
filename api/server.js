const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use('/uploads', express.static('uploads'));
server.use(helmet());
server.use(cors());
server.use(express.json());

const configureRoutes = require('../config/routes');

const equipmentRoutes = require('../routes/equipmentRoutes');
const boardLogRoutes = require('../routes/boardLogRoutes');
const otherRoutes = require('../routes/otherRoutes');
const schoolLogRoutes = require('../routes/schoolLogRoutes');
const userRoutes = require('../routes/userRoutes');
const authRoutes = require('../routes/authRoutes');

server.use('/equipment', equipmentRoutes);
server.use('/boardLog', boardLogRoutes);
server.use('/schoolLog', schoolLogRoutes);
server.use('/users', userRoutes);
server.use('/', otherRoutes);
server.use('/api', authRoutes);

configureRoutes(server);

server.get('/stripey', async (req, res) => {
  try {
    console.log("We're in!");
    var stripe = require('stripe')('sk_test_A7BKKJLuahxyevmxtp4BZXUT');
    const surelyNot = await stripe.charges.retrieve(
      'ch_1E0cNkLYS8hm8DTfvvL1vyYf',
      {
        api_key: 'sk_test_A7BKKJLuahxyevmxtp4BZXUT'
      }
    );
    res.status(200).json({ surelyNot });
  } catch (error) {
    console.log('ERR', error);
  }
});

module.exports = server;
