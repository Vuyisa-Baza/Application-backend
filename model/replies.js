const mongoose = require('mongoose');
const questionRouter = require('../questions/questions');

const replieSchema = new mongoose.Schema({
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
    
    question_id:{
        required:true,
        type:String
    },

    date:{
        required:true,
        type:Date
    }

})


module.exports = mongoose.model('replies',replieSchema);