const {sql} = require('../dbConnections');

exports.getUserByEmail = async (email) => {
    const [user] = await sql `
    SELECT * FROM users
    WHERE users.email = ${email}
    `;

    return user
}

exports.getUserById = async (id) => {
    const [user] = await sql `
    SELECT id, username, email, role FROM users
    WHERE users.id = ${id}
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