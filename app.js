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

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    surname: String,
    createdAt: { type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);

async function createUser() {
    const user = new User({
        username: 'aaron',
        password: '4321',
        name: 'Matt',
        surname: 'Popcorn'
    });

    const result = await user.save();
    console.log(result);
}

async function getUsers() {
    // eq  (equal)
    // ne  (not equal)
    // gt  (greater than)
    // gte (greater than or equal to)
    // lt  (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const pageNumber = 2;
    const pageSize = 10;

    const users = await User
        .find( {createdAt: {$lt: Date.now()}})
        //.or([{username: /o$/i}, {password: '1234'}]) // case insensitive
        .or([{username: /.*ca.*/i}, {password: '1234'}]) // contains 'ca' case insensitive
        //.or([{username: /^m/}, {password: '1234'}])
        //.sort( {username: 1})
        //.skip((pageNumber - 1) * pageNumber)
        .select({username: 1,password:1});
        //.count();
    console.log(users);
}

async function updateUsers(id) {
    // const user = await User.findById(id);
    const user = await User.update({_id: id}, {
        $set: {
            name : "Tony",
            surname : "Hawwk"
        }
    });
    // if(!user) return;
    // user.name = "Tony";
    // user.surname = "Hawwk";
    // user.set({
    //     name : "Tony",
    //     surname : "Hawwk"
    // });
    console.log(user);
}
// updateUsers('5d6f940299cfe20c54b98213');

async function removeUser(id) {
    const user = await User.deleteOne({_id: id});
    console.log(user);
}
removeUser('5d6f940299cfe20c54b98213');

app.use((req, res, next) => {
    console.log('Authenticating');
    next();
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
