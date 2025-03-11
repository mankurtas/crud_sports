const {sql} = require('../dbConnections');

exports.getUserByEmail = async (email) => {
    const [user] = await sql `
    SELECT * FROM users
    WHERE users.email = ${email}
    `;

    return user
}

//Create User

exports.createUser = async (newUser) => {
    const {username, email, password} = newUser;

    const [user] = await sql `
    INSERT into users
    (username, email, password)
    VALUES 
    (${username}, ${email}, ${password})
    RETURNING*
    `;

    return user;
};