const {sql} = require('../dbConnections');

//Create Player

exports.createPlayer = async (newPlayer) => {
    const {name, age, position, sport_id} = newPlayer;

    const [player] = await sql `
    INSERT into players
    (name, age, position, sport_id)
    VALUES 
    (${name}, ${age}, ${position}, ${sport_id})
    RETURNING*
    `;

    return player;
};

//Get Players by Sport ID

exports.getPlayersBySport = async (sportId) => {
    const players = await sql `
    SELECT * FROM players
    WHERE sport_id = ${sportId}
    `;

    return players
}