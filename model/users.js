const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        required:true,
        type:String
    },
    lastname:{
        required:true,
        type:String
    },
    dob:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    img:{
        data:Buffer,
        contentType:String
    }

})


module.exports = mongoose.model('Users',userSchema);