const express = require('express');
// const multer = require('multer');
const fs = require('fs'); 
const app = express();
const feedRouter = express.Router();
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

const feed = require("../model/feed");

feedRouter.get("/all",async(req,res,next)=>{
    try{
        const email = req.params.email;
        const feeds = await feed.find();
        res.status(200).send(feeds);
    }catch(error){
        res.status(500).send({message:error.message});
    }
})

feedRouter.post("/vote/:id",jsonParser,async (req,res,next)=>{
    const id = req.params.id;
    vote = req.body.vote;
    feed.updateOne({_id:{$eq:id}},{votes:vote},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            res.status(201).send(docs);
            console.log(docs);
        }
    })
})

module.exports = feedRouter;