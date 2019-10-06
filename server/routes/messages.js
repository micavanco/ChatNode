const { Message, validate} = require('../models/message');
const express = require('express');
const router = express.Router();

const { User } = require('../models/user');

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.user._id)

});
