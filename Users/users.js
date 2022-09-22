
const express = require('express');
// const multer = require('multer');
const fs = require('fs'); 
const app = express();
const usersRouter = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

//check if connection was successfull
database.on('error',(error=>{
    console.log(error);
}))

database.once('connected',()=>{
    console.log("Database Connected");
})

const Users = require("../model/users");
const path = require('path');


//storage for the file uploads
/*
let storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now())
    }
})

let upload = multer({storage:storage}).single('image');
*/

//manage the requests
usersRouter.post("/signup",jsonParser,async (req,res,next)=>{
    console.log(req.body.name);
    const user = {
        firstname:req.body.firstname,
        lastname:req.body.lastName,
        dob:req.body.dob,
        email:req.body.email,
        /*
        img:{
            data: fs.writeFileSync(path.join(__dirname + "/uploads/" + req.body.image.name)),
            contentType:'image/jpg'
        },
        */
        password:req.body.password,
    };

    const data = new Users(user);

    try {
        console.log("first here");
        const dataToSave = await data.save();
        res.status(200).send(user);
        console.log("we are done!");
    } catch (error) {
        res.status(401).send({message:error.message})
    }
    
});

usersRouter.get("/:email",async(req,res,next)=>{
    try{
        const email = req.params.email;
        const user = await Users.findOne({email:email});
        console.log(user);
        res.status(200).send(user);
    }catch(error){
        res.status(500).send({message:error.message});
    }
})

module.exports = usersRouter;