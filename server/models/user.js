const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

function validateUser(body) {
    const schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(body, schema);
}

exports.User = User;
exports.validate = validateUser;
