const express = require('express');
// const multer = require('multer');
const fs = require('fs'); 
const app = express();
const questionRouter = express.Router();
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

const questions = require("../model/question");


questionRouter.post("/add",jsonParser,async(req,res,next)=>{
    console.log(req.body);
    const question = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        title:req.body.title,
        body:req.body.body,
        language:req.body.language,
        category:req.body.category,
        replies:req.body.replies,
        lastReply:req.body.lastReply,
        likes:req.body.likes,
        views:req.body.views,
        activity:req.body.activity,
        users:req.body.users
    }
    const data = new questions(question);
    try {
        const dataToSave = await data.save();
        res.status(200).send(question);
    } catch (error) {
        res.status(401).send({message:error.message})
    }
})

questionRouter.get("/all",async(req,res,next)=>{
    try{
        const email = req.params.email;
        const discussions = await questions.find();
        res.status(200).send(discussions);
    }catch(error){
        res.status(500).send({message:error.message});
    }
})

questionRouter.post("/view/:id",jsonParser,async (req,res,next)=>{
    const id = req.params.id;
    const views = req.body.views;
    questions.updateOne({_id:{$eq:id}},{views:views},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            res.status(201).send(docs);
            console.log(docs);
        }
    })
})

questionRouter.post("/like/:id",jsonParser,async (req,res,next)=>{
    const id = req.params.id;
    const likes = req.body.likes;
    questions.updateOne({_id:{$eq:id}},{likes:likes},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            res.status(201).send(docs);
            console.log(docs);
        }
    })
})

questionRouter.post("/reply/:id",jsonParser,async (req,res,next)=>{
    const id = req.params.id;
    const user = req.body.user;
    const users = req.body.users;
    questions.updateOne({_id:{$eq:id}},{users:users.push(user)},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            res.status(201).send(docs);
            console.log(docs);
        }
    })
})


module.exports = questionRouter;