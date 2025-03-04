const postgres =  require('postgres');
require('dotenv').config();

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});

//Function to test connection to DB

const testConnection = async () => {
    try {
        
        await sql`
        SELECT 1 AS result
        `;
        console.log("Connections to database success");
        

    } catch (error) {
        console.error("Connections to database failed", error);
        
    }
  
};

module.exports = {sql, testConnection};