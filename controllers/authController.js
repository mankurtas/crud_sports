const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


const {
  createUser,
  getUserByEmail,
  getUserById
} = require('../modules/userModel');
const AppError = require('../utils/appError');

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
    const {email} = req.body;

    const user = await getUserByEmail(email);

    const token = signToken(user.id);
    sendTokenCookie(token, res);
    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {userId: user.id}
    })

  } catch (error) {
    next(error)
    
  }
  
};

exports.protect = async (req, res, next) => {

  try {

    let token = req.cookies?.jwt;

    if(!token) {
      throw new AppError("You not loged in.", 401);
    }
    
    //token verify

    const decoded = jwt.verify(token, process.env.JWT_SECRET )
    // console.log(decoded);

    //check if user exist
    const currentUser = await getUserById(decoded.id);

    if(!currentUser){
      throw new AppError('User not exist')
    }

    //grant accees to protected rout, add user to req object
    req.user = currentUser;

    next();

  } catch (error) {
    next(error)
    
  }
  
}

exports.allowAccessTo =  (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)){
        console.log(req.user);

        throw new AppError("You dont have permissions to performs this actions", 
          404);
        
          
      }
      next();
    } catch (error) {
      next(error)
      
    }
  }
};

exports.logout = (req, res) => {
  return res.clearCookie('jwt')
  .status(200)
  .json({
    message: "You are logged out",
  })
}