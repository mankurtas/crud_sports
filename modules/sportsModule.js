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

//Get all sport

exports.selectALlSports = async () => {
    const sports = await sql `
    SELECT * FROM sports
    `;

    return sports;
}

//Get sport by ID

exports.selectSportByID = async (id) => {
    const sport = await sql `
    SELECT * FROM sports
    WHERE sports.id = ${id}
    `;

    return sport[0]
}