const express = require('express');
const {signup, login, protect, logout } = require('../controllers/authController');


//validators
const validateSignup = require('../validators/signup')
const validateLogin = require('../validators/login')

const validate = require('../validators/validate');




const router = express.Router();

router.route('/signup').post(validateSignup, validate, signup);
router.route('/login').post(validateLogin ,validate,login);
router.route('/logout').get(protect, logout);






module.exports = router;