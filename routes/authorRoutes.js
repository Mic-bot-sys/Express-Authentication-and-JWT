const express = require("express");
const app = express()
const router = express.Router()
const passport = require("passport");
// require('./passport')(passport) 

const {createAuthor, getAuthors} = require("../controllers/authorController")


router.get("/get", passport.authenticate('jwt', { session: false }), getAuthors)

router.post("/post", createAuthor)

module.exports = router;
