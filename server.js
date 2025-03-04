const app = require('./app');


require('dotenv').config();

const {sql, testConnection } = require('./dbConnections');


const port = process.env.PORT || 3001;


(
    async () => {
        try {
            await testConnection();
            app.listen(port, () => {
            console.log(`Server started on http://localhost: ${port}`);
            });

        } catch (error) {

            console.error('Error: ', error);
            process.exit(1);
        }
      
    }
)();

process.on(`SIGINT`, async () => {
    console.log("Closing db connection");
    await sql.end();
    process.exit(0);
    
  
});