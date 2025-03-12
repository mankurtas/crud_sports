const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const {
  createUser
} = require('../modules/userModel');

//function to generate jwt token, payload - id

const signToken = (id) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET, 
    {expiresIn:process.env.JWT_EXPIRES_IN});
    return token;
  
};

//function to send cookie to front 

const sendTokenCookie = (token, res) => {
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };
  
  res.cookie('jwt', token, cookieOption);

};

//user signup

exports.signup = async (req, res, next) => {
  try {

    const newUser = req.body;
    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("User not Created", 400);
    }

    //User log ins after creation
    const token = signToken(createdUser.id);
    
    sendTokenCookie(token, res);


    createdUser.password = undefined;

    res.status(201).json({
      status: "Success",
      data: {userId: createdUser.id},
    });

  } catch (error) {
    next(error);
  }
}


//Log in

exports.login = async (req, res, next) => {
  try {
    
    
  } catch (error) {
    next(error)
    
  }
  
}