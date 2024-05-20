const mongoose = require('mongoose'); // Erase if already required
const User = require("./userModel")

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:false,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    description:{
        type:String,
        required:false,
        unique:false,
    },
    body:{
        type:String,
        required:true,
        unique:false,
    },
    readCount:{
        type:Number,
        required:false,
        unique:false,
    },
    readingTime:{
        type:String,
        required:false,
        unique:false,
    },
    isPublished:{
        type:Boolean,
        required:false,
        default: false
    },
    datePublished:{
        type: Date, 
        required: false
    },
    isDeleted:{
        type: Boolean, 
        required: true,
        default: false
    },
    dateDeleted:{
        type: Date, 
        required: false
    },
}, {timestamps: true,
versionKey: false});



//Export the model
module.exports = mongoose.model('Blog', blogSchema);