const mongoose = require("mongoose");
require("dotenv").config()
const dbLogger = require("../loggers/dbLogger")

const MONGODB_URI = process.env.MONGODB_URI

// Connection to MongoDb
function connectToMongoDb(){
    mongoose.connect(MONGODB_URI)

    mongoose.connection.on("connected", ()=>{
        dbLogger.info("Connected to Mongoose Database Successfully")
    })

    mongoose.connection.on("error", ()=>{
        dbLogger.error("Database Connection Failed!!!")
    })
}

module.exports = {connectToMongoDb}