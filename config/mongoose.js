const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/placement-cell');

const db = mongoose.connection;

db.once('open', function () {
  console.log('Connected to database');
});

db.on('error', console.error.bind(console, 'Failed to connect to database'));

module.exports = db;