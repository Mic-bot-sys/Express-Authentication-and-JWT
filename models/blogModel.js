const mongoose = require('mongoose'); // Erase if already required
const User = require("./userModel")

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
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
        default: 0,
        required:false,
        unique:false,
    },
    readingTime:{
        type:String,
        required:false,
        unique:false,
    },
    tags: [{ type: String}],
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


// Pre-save hook to convert data to lowercase before saving into the Blog database that i created
blogSchema.pre('save', function(next) {
    // Convert title and content to lowercase before saving
    this.title = this.title.toLowerCase();
    this.body = this.body.toLowerCase();
    this.description = this.description.toLowerCase();
    this.tags = this.tags.map(item => item.toLowerCase());
    next();
  });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);