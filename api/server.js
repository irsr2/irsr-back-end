const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

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

module.exports = server;
