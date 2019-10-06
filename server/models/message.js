const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    receiverId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

function validateMessage(message) {
    const schema = {
        receiverId: Joi.string().required(),
        text: Joi.string().required()
    };

    return Joi.validate(message, schema);
}

exports.Message = messageSchema;
exports.validate = validateMessage;
