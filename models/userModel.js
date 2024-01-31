const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcryptjs")

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamps:  true, versionKey: false});


// The code below in the userSchema.pre is called a PRE-HOOK
// Before a User data is saved into the Database, this lines of code gets executed
// This function we are working with is to take the plain text of password and then HASH it
userSchema.pre(
    'save',
    async function(next){
        const hashedPassord = await bcrypt.hash(this.password, 11)
        this.password = hashedPassord;

        next();
    } 
)

// You can add methds to your schema and below is the method we are adding to our Usershema
userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const isValid = await bcrypt.compare(password, user.password)

    return isValid
}

//Export the model
module.exports = mongoose.model('User', userSchema);