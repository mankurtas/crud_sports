const express = require('express');
const {signup, login} = require('../controllers/authController');


//validators
const validateSignup = require('../validators/signup')
const validate = require('../validators/validate');




const router = express.Router();

router.route('/signup').post(validateSignup, validate, signup);
router.route('/login').post(login);




module.exports = router;