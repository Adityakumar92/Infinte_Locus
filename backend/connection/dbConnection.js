const mongoose = require('mongoose');

const mongoDB_URL=process.env.DB_URL;

const dbConnection = async()=>{
    try{
        await mongoose.connect(mongoDB_URL);
        console.log('Database connection sucessfully : )');
    }catch(error){
        console.error(err.message);
        process.exit(1);
    }
}

dbConnection();