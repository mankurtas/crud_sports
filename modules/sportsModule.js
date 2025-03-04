const {sql} = require('../dbConnections');

//Create Sport

exports.createSport = async (newSport) => {
    const {name, popularity_rank} = newSport;

    const sports = await sql `
    INSERT into sports
    (name, popularity_rank)
    VALUES 
    (${name}, ${popularity_rank})
    RETURNING*
    `;

    return sports[0];
};

