'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const app = require('./src/server.js');
const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  app.start(PORT);
});
