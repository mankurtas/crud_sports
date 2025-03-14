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

//Get all sports

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

//Get sport by name

exports.getSportByName = async (name) => {
    const [sport] = await sql `
    SELECT * FROM sports
    WHERE sports.name = ${name}
    `;

    return sport
}

//Delete sport by id

exports.deleteSport = async (id) => {
    const sport = await sql `
    DELETE FROM sports
    WHERE sports.id = ${id}
    `;
}

//Update sport

exports.updateSport = async (id, updateSport) => {

    const columns = Object.keys(updateSport) 

    const upSport = await sql `
    UPDATE sports
    SET ${sql(updateSport, columns)}
    WHERE id = ${id}
    RETURNING *
    `;

    return upSport[0]
}

