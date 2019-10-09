const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// const users = [
//     {id: 1, username: 'John', password: 'Walker'},
//     {id: 2, username: 'Bob', password: 'admin2'}
// ];

// router.get('/', async (req, res) => {
//     const users = await User.find().sort('username');
//     res.send(users);
// });

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user.length !== 0)
        res.send(_.pick(user, ['_id', 'username', 'password', 'name', 'surname']));
    else
        res.status(404).send(`User of given username ${req.params.username} does not exists`);
});

router.post('/', async (req, res) => {
    const { error } = validate( req.body );
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username});
    if(user) return res.status(400).send('User with given username already exists.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        surname: req.body.surname,
        isAdmin: false
    });

    user = await user.save();
    res.send(user);
});

router.put('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send(`User does not exists`);


    try {
        user.password = req.body.password;
        user.name = req.body.name;
        user.surname = req.body.surname;

        const result = await user.save();
        res.send(result);
    }catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:username', auth, async (req, res) => {
    let user = await User.deleteOne({_id: res.user._id});
    if(!user) return res.status(404).send(`User of given username ${res.user._id} does not exists`);

    res.send(user);
});

module.exports = router;

//
// async function createUser(username, password) {
//     const user = new User({
//         username: username,
//         password: password,
//         name: 'Matt',
//         surname: 'Popcorn'
//     });
//
//     const result = await user.save();
//     console.log(result);
// }
//
// async function getUsers() {
//     // eq  (equal)
//     // ne  (not equal)
//     // gt  (greater than)
//     // gte (greater than or equal to)
//     // lt  (less than)
//     // lte (less than or equal to)
//     // in
//     // nin (not in)
//
//     const pageNumber = 2;
//     const pageSize = 10;
//
//     const users = await User
//         .find( {createdAt: {$lt: Date.now()}})
//         //.or([{username: /o$/i}, {password: '1234'}]) // case insensitive
//         .or([{username: /.*ca.*/i}, {password: '1234'}]) // contains 'ca' case insensitive
//         //.or([{username: /^m/}, {password: '1234'}])
//         //.sort( {username: 1})
//         //.skip((pageNumber - 1) * pageNumber)
//         .select({username: 1,password:1});
//     //.count();
//     console.log(users);
// }
//
// async function updateUsers(id) {
//     // const user = await User.findById(id);
//     const user = await User.update({_id: id}, {
//         $set: {
//             name : "Tony",
//             surname : "Hawwk"
//         }
//     });
//     // if(!user) return;
//     // user.name = "Tony";
//     // user.surname = "Hawwk";
//     // user.set({
//     //     name : "Tony",
//     //     surname : "Hawwk"
//     // });
//     console.log(user);
// }
// // updateUsers('5d6f940299cfe20c54b98213');
//
// async function removeUser(id) {
//     const user = await User.deleteOne({_id: id});
//     console.log(user);
// }


