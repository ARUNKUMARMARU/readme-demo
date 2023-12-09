const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./utlis/config')
const cora = require('cors')


app.use(express.json());

mongoose.connect(config.MONGODB_URI)
.then(()=>{
    console.log('connected to mongodb server.');
})
.catch((error)=>{
    console.error(error)
})

//create schema
const noteSchema= new mongoose.Schema({
    id: Number,
    content: String,
    importent: Boolean
});

//create model
const Note = mongoose.model("Note",noteSchema,"notes");

app.get('/api/notes',(request,response)=>{
Note.find({},{})
.then(notes =>{
    response.statusCode(200).json(notes)
})


});

const HOSTNAME = '127.0.0.1'
const PORT = 3001;
app.listen(config.PORT,()=>{
    console.log(`The server running at http://${config.HOSTNAME}:${config.PORT}`);
});

