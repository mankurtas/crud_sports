const {param} = require('express-validator');
const {selectSportByID} = require('../modules/sportsModule');


const validateSportId = [
    param('id')
    .custom(async (value) => {

        const checkSportById = await selectSportByID(value)
        if(!checkSportById)
            throw new Error("Sport ID not found");
                 
    })
]

module.exports = validateSportId