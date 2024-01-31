const mongoose = require("mongoose");
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

// Connection to MongoDb
function connectToMongoDb(){
    mongoose.connect(MONGODB_URI)

    mongoose.connection.on("connected", ()=>{
        console.log("Connected to Mongoose Database Successfully")
    })

    mongoose.connection.on("error", ()=>{
        console.log("Database Connection Failed!!!")
    })
}

module.exports = {connectToMongoDb}