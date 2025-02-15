const express = require('express');
const app = express();
const dbConnect = require('./config/database');
const routes = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//parsing
app.use(express.json());
app.use(cookieParser());
//mount
app.use('/api/v1',routes);
dbConnect();
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
app.get('/',(req,res)=>{
    res.send('this is "/" route');
})