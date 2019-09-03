const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const users = [
    {id: 1, username: 'John', password: 'Walker'},
    {id: 2, username: 'Bob', password: 'admin2'}
];

router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
    //res.send(`Id: ${req.params.id}, Username: ${req.params.username}, Password: ${req.params.password}`);
    const user = users.find(u => u.id === parseInt(req.params.id));

    if(user)
        res.send(user);
    else
        res.status(404).send(`User of given id ${req.params.id} does not exists`);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;
