const express = require('express');
const app =express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Middlewares
//app.use(auth);

//Import Routes
const postRoute = require('./routes/posts');

app.use('/posts',postRoute);


app.get('/',(req,res)=>{
    res.send('We are on home');
});


//Connect to DB
mongoose.connect(
    'mongodb+srv://xxx:xxxx@xxx.xxx.mongodb.net/xxxx',
    {useNewUrlParser:true},()=>{
    console.log('connected to DB');
})
app.listen(3000);

