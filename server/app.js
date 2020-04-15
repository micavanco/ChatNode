const express = require('express');
const app = express();
const config = require('config');
var cors = require('cors');

app.use(cors());

if(!config.get('jwtPrivateKey')) {
    console.error('JWT key not defined...');
    process.exit(1);
}


require('./startup/routes')(app);
require('./startup/db')();


const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
