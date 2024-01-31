const express = require("express");
const app = express()
const router = express.Router()
const {createBook, getBooks} = require("../controllers/bookController")

router.get("/get", getBooks)

router.post("/post", createBook)



module.exports = router;