const {sql} = require('../dbConnections');

//Create Sport

exports.createPlayer = async (newPlayer) => {
    const {name, age, position, sport_id} = newPlayer;

    const sports = await sql `
    INSERT into sports
    (name, age, position, sport_id)
    VALUES 
    (${name}, ${age}, ${position}, ${sport_id})
    RETURNING*
    `;

    return players[0];
};