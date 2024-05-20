const express = require("express");
const app = express()
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
require("dotenv")



// Get all the users in the Database
const getUsers = async (req, res) =>{
    try{
        // let users = await User.find().select("-password")
        let users = await User.find().select({createdAt:0, updatedAt:0})
 
        if (users) return res.status(200).json(users)
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}



const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email})
        const isValid = await user.isValidPassword(password)

        if (isValid){
            const body = {_id: user.id, email: user.email}
            const token = jwt.sign({user: body}, process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )
            return res.status(200).json({token: token})
        }
        return res.status(500).json({"message": "Invalid Login Credentials"})

    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
}



// Create an User into the Database
const createUser = async (req, res) =>{
    try{
        const {email, password, firstName, lastName} = req.body;
    
        let user = new User({
            firstName,
            lastName,
            email,
            password,
        })
        await user.save()
        
        return res.status(200).json({"message": "User Created Successfully"})
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


module.exports = {
    createUser,
    loginUser,
    getUsers,
}