const {body} = require('express-validator');
const {getSportByName} = require('../modules/sportsModule');

const validateNewSport = [
    body().notEmpty().withMessage("Request body must contain data"),
    body('name')
    .notEmpty()
    .withMessage("Field is required")
    .isString()
    .withMessage("Name must be string")
    .isLength({min:3, max:100})
    .withMessage("Name must be between 3 and 100 characters")
    .custom(async (value) => {

        const checkSportExist = await getSportByName(value);

        if (checkSportExist) {
            throw new Error ("Sprot already exist");
        }
      
    }),
];

module.exports = validateNewSport;