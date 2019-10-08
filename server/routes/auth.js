const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

router.post('/', async (req, res) => {
    const { error } = await validate( req.body );
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare( req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid username or password.');

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(user);
});

const validate = function(body) {
    const schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate( body, schema);
};

module.exports = router;
