const Joi = require('@hapi/joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}


app.use((req, res, next) => {
    console.log('Authenticating');
    next();
});

const users = [
    {id: 1, username: 'John', password: 'Walker'},
    {id: 2, username: 'Bob', password: 'admin2'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.post('/api/users', (req, res) => {
    const { error } = validateUser(req.body);

    if(error)
        res.status(400).send(error.details[0].message);
    else
    {
        const user = {id: users.length+1, username: req.body.username, password: req.body.password};
        users.push(user);
        res.send(user);
    }
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if(!user)
        return res.status(404).send(`User of given id ${req.params.id} does not exists`);


    const { error } = validateUser(req.body);

    if(error)
        res.status(400).send(error.details[0].message);
    else
    {
        user.username = req.body.username;
        user.password = req.body.password;
        res.send(user);
    }
});

app.get('/api/users/:id', (req, res) => {
    //res.send(`Id: ${req.params.id}, Username: ${req.params.username}, Password: ${req.params.password}`);
    const user = users.find(u => u.id === parseInt(req.params.id));

    if(user)
        res.send(user);
    else
        res.status(404).send(`User of given id ${req.params.id} does not exists`);
});

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if(user){
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.send(user);
    }
    else
        res.status(404).send(`User of given id ${req.params.id} does not exists`);
});

function validateUser(body) {
    const schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(body, schema);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
