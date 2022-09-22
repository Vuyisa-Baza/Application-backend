const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
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
    votes:{
        required:true,
        type:Number
    },
    body:{
        required:true,
        type:String
    },
    

})


module.exports = mongoose.model('feed',feedSchema);