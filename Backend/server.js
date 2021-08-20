const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const BookRoute = require('./controllers/books.controller')


dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = process.env.PORT || 8070;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
},(error) =>{
    if(error){
        console.log('DataBase ERROR: ',error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

app.use('/bookDetails', BookRoute);

app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
});