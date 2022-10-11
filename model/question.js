const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    firstname:{
        required:true,
        type:String
    },
    lastname:{
        required:true,
        type:String
    },
    title:{
        required:true,
        type:String
    },
    body:{
        required:true,
        type:String
    },
    language:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    },
    replies:{
        required:true,
        type:Number
    },
    lastReply:{
        required:true,
        type:Date
    },
    likes:{
        required:true,
        type:Number
    },
    views:{
        required:true,
        type:Number
    },
    activity:{
        required:true,
        type:Date
    },
    users:{
        required:true,
        type:[String]
    }

})


module.exports = mongoose.model('questions',questionSchema);