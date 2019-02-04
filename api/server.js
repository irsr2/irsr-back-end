const express = require('express');
const helmet = require('helmet');

const server = express();

const db = require('../data/dbConfig');

server.use(helmet());
server.use(express.json());

const equipmentRoutes = require('../routes/equipmentRoutes');
const boardLogRoutes = require('../routes/boardLogRoutes');
const otherRoutes = require('../routes/otherRoutes');
const schoolLogRoutes = require('../routes/schoolLogRoutes');

server.use('/equipment', equipmentRoutes);
server.use('/boardLog', boardLogRoutes);
server.use('/schoolLog', schoolLogRoutes);
server.use('/', otherRoutes);

module.exports = server;
