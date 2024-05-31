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

// connectToMongoDb()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://oladtolulase:iDoovFjh8w5RTt9o@blogdb.6k8zxwu.mongodb.net/blogapi";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// This is to allow the Server to accept Data from the Postman Form Data
app.use("/v1/user", multer.none(), userRoutes)
app.use("/v1/blog", multer.none(), blogRoutes)

const PORT = "8000"

app.listen(PORT, ()=>{
    globalLogger.info(`Server running on localhost://127.0.0.1:${PORT}`)
})