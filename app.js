const express = require('express');
const app = express();
const path = require('path');

// set directory 
app.use(express.static(__dirname));
app.use(express.static("public"));

//database
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contacthospitalsite', {useNewUrlParser: true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    condition: String
  });
var contact = mongoose.model('Contact', contactSchema);


//Express specific stuff
app.use('/public', express.static('public'));//for serving static files
app.use(express.urlencoded());

//Endpoints
app.get('/', (req,res)=>{
res.sendFile(__dirname + "/" + "public/index.html");
});

  //contact form
  app.post('/', (req, res)=>{
    var myGroupData = new contact(req.body);
    myGroupData.save().then(()=>{
        res.sendFile(__dirname + "/" + "public/index.html");
    })
})

app.listen(1200);
console.log("The application has been started at port 1200");