const { Message, validate} = require('../models/message');
const express = require('express');
const router = express.Router();

const { User } = require('../models/user');

router.get('/:id', async (req, res) => {

    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send("User not found.");

    const messages = user.messages;

    const messages_user = messages.filter((e) => e.receiverId === req.params.id);
    if(messages_user.length === 0) return res.status(400).send("Messages not found.");

    res.status(200).send(messages_user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findById(req.user._id);
    if(!user) return res.status(400).send("User not found.");

    const receiver = await User.findById(req.body.receiverId);
    if(!receiver) return res.status(400).send("User you want to send message was not found.");

    const date = Date.now();

    const message = new Message({
        receiverId: req.body.receiverId,
        text: req.body.text,
        date: date
    });
    user.messages.unshift(message);

    user = await user.save();

    res.status(200).send('Message sent.');
});

module.exports = router;
