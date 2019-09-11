const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const users = require('./routes/users');
const home = require('./routes/home');
const express = require('express');
const app = express();

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

// Db work...
mongoose.connect('mongodb://localhost/chatnode')
    .then(() => dbDebugger('Connected to MongoDB...'))
    .catch(err => dbDebugger('Could not connect to MongoDB', err));


app.use((req, res, next) => {
    console.log('Authenticating');
    next();
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
