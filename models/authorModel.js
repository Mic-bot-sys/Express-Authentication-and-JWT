const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var authorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:false,
    },
    lastName:{
        type:String,
        required:true,
        unique:false,
    },
    middleName:{
        type:String,
        required:false,
        unique:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    book:[{
        type: mongoose.Types.ObjectId,
        required:true,
        ref: 'Book'
    }],
}, {timestamps: true,
    versionKey: false});

//Export the model
module.exports = mongoose.model('Author', authorSchema);