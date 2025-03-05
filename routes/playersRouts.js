const express = require('express');
const router = express.Router();



const {createPlayerC} = require('../controllers/playersController');


router.route('/').post(createPlayerC);



module.exports = router;