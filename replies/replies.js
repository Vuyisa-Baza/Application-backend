const express = require('express');
// const multer = require('multer');
const fs = require('fs'); 
const app = express();
const repliesRouter = express.Router();
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

const replies = require("../model/replies");


repliesRouter.post("/add",jsonParser,async(req,res,next)=>{
    console.log(req.body);
    const reply = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        title:req.body.title,
        body:req.body.body,
        question_id:req.body.question_id,
        date:req.body.date
    }
    const data = new replies(reply);
    try {
        const dataToSave = await data.save();
        res.status(200).send(reply);
    } catch (error) {
        res.status(401).send({message:error.message})
    }
})


repliesRouter.get("/all",async(req,res,next)=>{
    try{
        const discussions = await replies.find();
        res.status(200).send(discussions);
    }catch(error){
        res.status(404).send({message:error.message});
    }
})


module.exports = repliesRouter;