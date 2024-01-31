const express = require("express");
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const {connectToMongoDb} = require("./database/db")
const authorRoutes = require("./routes/authorRoutes")
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")
const multer = require('multer')()
require("./middlewares/authMiddleware")


connectToMongoDb()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// This is to allow the Server to accept Data from the Postman Form Data
app.use("/v1/author", multer.none(), authorRoutes)
app.use("/v1/user", multer.none(), userRoutes)
app.use("/v1/book", multer.none(), bookRoutes)

const PORT = "8000"

app.listen(PORT, ()=>{

    console.log(`Server running on localhost://127.0.0.1:${PORT}`)
})