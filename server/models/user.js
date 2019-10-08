const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        required: true
    },
    createdAt: { type: Date, default: Date.now}
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(body) {
    const schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required(),
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required()
    };

    return Joi.validate(body, schema);
}

exports.User = User;
exports.validate = validateUser;
