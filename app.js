const express = require('express');
const appError = require('./utils/appError')
const cookieParser = require('cookie-parser');


const sportsRouts = require('./routes/sportsRout');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');

const app = express();


//Body parser
app.use(express.json());


//cookie parser
app.use(cookieParser());

//middleware 1
app.use('/api/v1/sports', sportsRouts);
app.use('/api/v1/users', userRoutes);


//middleware 2
app.use('*', (req,res, next) => {
    //naudojam AppErr

    const err = new AppError(`Route not exist: ${req.originalUrl}`, 404);

    //express know that error appears, send error to centralized errors manager
    next(err);
});

//middleware 3
//centralized errors handler
app.use((err, req, res, next) => {
  const errMessage = err.message || 'Internal server Error';
  const statusCode = err.statusCode || 500;
  const errStatus = err.status || "error";

  res.status(statusCode).json({
    status: errStatus,
    message: errMessage
  })
});


module.exports = app;
