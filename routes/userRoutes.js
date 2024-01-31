const express = require("express");
const app = express()
const router = express.Router()
const passport = require("passport")
const {createUser, getUsers, loginUser} = require("../controllers/userController")

router.get("/get", getUsers)

router.post("/login",  loginUser)

router.post("/post",  createUser)



module.exports = router;