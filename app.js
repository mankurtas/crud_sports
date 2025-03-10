const express = require('express');


const sportsRouts = require('./routes/sportsRout');
const playerRouts = require('./routes/playersRouts');

const app = express();


//Body parser
app.use(express.json());
app.use('/api/v1/sports', sportsRouts);







module.exports = app;
