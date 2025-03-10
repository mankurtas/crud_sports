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

//Update player:

exports.updatePlayer = async (id, upPlayer) => {
    const columns = Object.keys(upPlayer);

    const [updatedPlayer] = await sql `
    UPDATE players
    SET ${sql(upPlayer, columns)}
    WHERE id = ${id}
    RETURNING*
    ` 
    return updatedPlayer
  
}

//delete player

exports.deletePlayer = async (id) => {
    const player = await sql `
    DELETE FROM players
    WHERE players.id = ${id}
    `;
  
}