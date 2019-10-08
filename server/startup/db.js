const mongoose = require('mongoose');
const config = require('config');
const dbDebugger = require('debug')('app:db');

// Db work...
module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
        .then(() => dbDebugger('Connected to MongoDB...'))
        .catch(err => dbDebugger('Could not connect to MongoDB', err));
};

