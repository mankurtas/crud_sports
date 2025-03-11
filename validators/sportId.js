const {param} = require('express-validator');
const {selectSportByID} = require('../modules/sportsModule');
const AppError = require('../utils/appError');


const validateSportId = [
    param('id')
    .custom(async (value) => {

        const checkSportById = await selectSportByID(value)
        if(!checkSportById)
            throw new AppError("Sport ID not found");
    }),
    param('sportID')
    .custom(async (value) => {

        const checkSportById = await selectSportByID(value)
        if(!checkSportById)
            throw new AppError("Sport ID not found");
    }),
    param('sportId')
    .custom(async (value) => {

        const checkSportById = await selectSportByID(value)
        if(!checkSportById)
            throw new AppError("Sport ID not found");
    }),
]

module.exports = validateSportId