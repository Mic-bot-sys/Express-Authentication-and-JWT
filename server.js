// Start the Imports
const express = require("express");
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const {connectToMongoDb} = require("./database/db")
const requestLogger = require("./middlewares/requestsLoggers")
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const multer = require('multer')()
require("./middlewares/authMiddleware")
const globalLogger = require("./loggers/globalLogger")
// End the Imports


// Start the Middlewares
app.use(requestLogger)

connectToMongoDb()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// This is to allow the Server to accept Data from the Postman Form Data
app.use("/v1/user", multer.none(), userRoutes)
app.use("/v1/blog", multer.none(), blogRoutes)

const PORT = "8000"

app.listen(PORT, ()=>{
    globalLogger.info(`Server running on localhost://127.0.0.1:${PORT}`)
})