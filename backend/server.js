const express=require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./connection/dbConnection');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const PORT=process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});