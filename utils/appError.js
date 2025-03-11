class AppError extends Error {
    constructor(message, statusCode){
        super(message); // message parametras priklauso tevinei klasei Error, super yra tevines klases konstruktoriaus kvietimas
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? "fail" : "error";

        Error.captureStackTrace(this, this.constructor); // issaugo klaidos kilmes vieta

    }
}

module.exports = AppError;
