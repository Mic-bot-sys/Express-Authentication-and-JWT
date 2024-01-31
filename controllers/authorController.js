const express = require("express");
const app = express()
const Author = require("../models/authorModel")



// Get all the Authors in the Database
const getAuthors = async (req, res) =>{
    try{
        let authors = await Author.find().select("-createdAt")
        // let authors = await Author.find().select({createdAt:0, updatedAt:0, "-__v"})

        if (authors) return res.status(200).json(authors)
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}



// Create an Author into the Database
const createAuthor = async (req, res) =>{
    try{
        const {firstName, lastName, email} = req.body;
    
        let author = new Author({
            firstName,
            lastName,
            email
        })
        await author.save()
        
        return res.status(200).json({"message": "Request Successful"})
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


module.exports = {
    createAuthor,
    getAuthors
}