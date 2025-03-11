const argon2 = require('argon2');

const {
  createUser
} = require('../modules/userModel');

exports.signup = async (req, res, next) => {
  try {

    const newUser = req.body;
    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    const createdUser = await createUser(newUser);

    createdUser.password = undefined;

    res.status(201).json({
      status: "Success",
      data: createdUser,
    });

  } catch (error) {
    next(error);
  }
}
