const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const users = require('./routes/users');
const home = require('./routes/home');

module.exports = function(app) {
    app.set('view engine', 'pug');
    app.set('views', './views');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(express.static('public'));
    app.use(helmet());
    app.use('/api/users', users);
    app.use('/', home);

// Configuration
    console.log('Application Name: ' + config.get('name'));
    console.log('Mail Server: ' + config.get('mail.host'));
    console.log('Mail Password: ' + config.get('mail.password'));

    if(app.get('env') === 'development') {
        app.use(morgan('tiny'));
        startupDebugger('Morgan enabled');
    }
};


