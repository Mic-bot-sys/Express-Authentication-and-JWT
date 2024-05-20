const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var stateSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
        unique:true,
    },
}, {timestamp: true,
versionKey: false});



//Export the model
module.exports = mongoose.model('State', stateSchema);