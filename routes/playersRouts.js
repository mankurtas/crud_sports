const express = require('express');
const router = express.Router();



const {createPlayerForSport: createPlayerC} = require('../controllers/playersController');


router.route('/').post(createPlayerC);



module.exports = router;