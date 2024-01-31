const express = require("express");
const Book = require("../models/bookModel")
const mongoose = require("mongoose")



// Get all the books in the Database
const getBooks = async (req, res) =>{
    try{
        let books = await Book.find().exec()

        if (books) return res.status(200).json(books)
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}



// Create a Book into the Database
const createBook = async (req, res) =>{
    try{
        const {title, author, isbn} = req.body;
        
        let authorObjId = new mongoose.Types.ObjectId(author)
    
        let book = new Book({
            title,
            author: authorObjId,
            isbn
        })
        await book.save()
        
        return res.status(200).json({"message": "Book Created Successfully"})
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


module.exports = {
    createBook,
    getBooks
}