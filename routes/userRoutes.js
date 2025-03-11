const express = require('express');
const {signup} = require('../controllers/authController');


//validators
const validateSignup = require('../validators/signup')
const validate = require('../validators/validate');




const router = express.Router();

router.route('/signup').post(validateSignup, validate, signup);




module.exports = router;