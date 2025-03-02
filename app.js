const express = require('express');
require('dotenv').config();

const sportsRouts = require('./routes/sportsRout');
const port = process.env.PORT || 3001;

const app = express();


//Body parser
app.use(express.json());


app.use('/api/v1/sports', sportsRouts);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    
  
})