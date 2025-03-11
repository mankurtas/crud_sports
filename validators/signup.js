const { body } = require('express-validator');
const { getUserByEmail } = require('../modules/userModel');

const validateNewUser = [
  // Check if body is not empty
  body().notEmpty().withMessage('User body must contain data'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail() // Sanitize email address
    .custom(async (value) => {
      const user = await getUserByEmail(value); // Query the database
      if (user) {
        throw new Error('Email already exists');
      }
      return true; // Validation passed
    }),
    
  body('username').notEmpty().withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    // .isLength({ min: 8 })
    // .withMessage('Password must be at least 8 characters')
    // Custom validation to check if passwords match,
    .custom(async (value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error(
          'Password and password confirmation do not match. Please try again.'
        );
      }
      return true; // Validation passed
    }),
];
module.exports = validateNewUser;