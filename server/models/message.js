const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: {
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

const Message = mongoose.model('Message', messageSchema);

function validateMessage(message) {
    const schema = {
        userId: Joi.string().required(),
        text: Joi.string().required()
    };

    return Joi.validate(message, schema);
}

exports.Message = Message;
exports.validate = validateMessage;
