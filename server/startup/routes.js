const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');

const users = require('../routes/users');
const home = require('../routes/home');
const messages = require('../routes/messages');
const auth = require('../routes/auth');

module.exports = function(app) {
    app.set('view engine', 'pug');
    app.set('views', './views');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(express.static('public'));
    app.use(helmet());
    app.use('/api/users', users);
    app.use('/', home);
    app.use('/api/messages', messages);
    app.use('/api/auth', auth);

// Configuration
    console.log('Application Name: ' + config.get('name'));
    console.log('Mail Server: ' + config.get('mail.host'));
    console.log('Mail Password: ' + config.get('mail.password'));

    if(app.get('env') === 'development') {
        app.use(morgan('tiny'));
        startupDebugger('Morgan enabled');
    }
};


