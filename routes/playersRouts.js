const express = require('express');
const router = express.Router();



const {createPlayerC} = require('../controllers/playersController');


router.route('/:id').post(createPlayerC);



module.exports = router;