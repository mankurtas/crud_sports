const { body } = require('express-validator');

const argon2 = require('argon2');

const {getUserByEmail} = require('../modules/userModel');


const validateLogin = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid')
        .normalizeEmail()// Sanitize email address
        .custom( async (value) => {
            const user = await getUserByEmail(value);
            if(!user){
                throw new Error("User not found, please sign up");
                
            }
            return true; // validation passed
        }),

    body('password')
        .notEmpty()
        .withMessage('Pass is required')
        .custom(async (value, {req}) => {
            const user = await getUserByEmail(req.body.email);

            if(user){
                const matchPass = await argon2.verify(user.password, value);
                if(!matchPass){
                    throw new Error("Password is incorrect");
                }
                return true;
            }
          
        }),
];

module.exports = validateLogin;