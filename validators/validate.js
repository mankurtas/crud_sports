const {validationResult} = require('express-validator');
const AppError = require('../utils/appError');

const validate = (req, res, next) => {

    // if(!errors.isEmpty()) {
    //     return res.status(400).json({
    //         status: "Fail",
    //         errors: errors.array(),
    //     })

    // }
    // next();

    try {
    
        const errors = validationResult(req);

    if(!errors.isEmpty()){

         //create error string
         const errorString = errors
         .array()
         .map((error) => error.msg)
         .join('; ');

        throw new AppError(errorString,400);
    }

    next(); //Proceed to the next middleware or controller, validateion passed

    } catch (error) {
        next(error);
    }
}

module.exports = validate;