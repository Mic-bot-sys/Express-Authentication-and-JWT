const express = require("express");
const app = express()
const router = express.Router()
const passport = require("passport")
const authenticateToken = require("../middlewares/authenticateToken")
const {createUser, getUsers, loginUser} = require("../controllers/userController")

router.get("/get", authenticateToken, getUsers)

router.post("/login",  loginUser)

router.post("/create",  createUser)



module.exports = router;