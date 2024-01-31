const mongoose = require('mongoose'); // Erase if already required
const Author = require("./authorModel")

// Declare the Schema of the Mongo model
var bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:false,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author",
    },
    isbn:{
        type:String,
        required:true,
        unique:true,
    },
}, {timestamp: true,
versionKey: false});


// bookSchema.virtual('author', {
//     localField: '_id',
//     foreignField: 'Book',
//     ref: 'Author',
// });


//Export the model
module.exports = mongoose.model('Book', bookSchema);