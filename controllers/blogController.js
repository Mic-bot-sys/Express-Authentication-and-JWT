const express = require("express");
const Blog = require("../models/blogModel")
const mongoose = require("mongoose")



// Get all the blogs in drafts state. blogs where isPublished state is false are the drafts blogs
const getDraftBlogs = async (req, res) =>{
    try{
        let blogs = await Blog.find({isDeleted: false, isPublished: false})

        if (blogs) return res.status(200).json(blogs)
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


// Get all the published blogs in the Database for an annonymous user
const getPublishedBlogs = async (req, res) =>{
    try{
        let blogs;
        let searchCondition= {}
        const {title, authorId, tag} = req.query
        let page = req.query.page || 0 //Here, the first page starts from zero
        let limit = req.query.limit || 2

        if(title){
            searchCondition.title = new RegExp(title, 'i');
        }
        if (authorId){
            searchCondition.author = authorId
        }
        if (tag){
            searchCondition.tag =  { $in: [tag] };
        }

        const blogQuery = Blog.find({isDeleted: false, isPublished: true, ...searchCondition})
        blogs = await blogQuery.skip(page * limit).limit(limit)

        const resObj = {
            blogs, page: page === 0 ? parseInt(page)+1 : page
            , limit, authorId, dataAmount: blogs.length
        }

        if (blogs) return res.status(200).json(resObj)
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


// IMPLEMENTED
// Get One published blog in the Database for an annonymous user
const getAPublishedBlogById = async (req, res) =>{
    try{
        const publishedBlogId = req.params.publishedBlogId
        let blog = await Blog.findOne({_id: publishedBlogId, isDeleted: false, isPublished: true}).populate("author")

        if (blog) return res.status(200).json(blog)

        return res.status(403).json({message: "This blog does not exist or has not been published"})
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


// Get All the blogs created by an author depending on the state
const getAllBlogsByAuthorId = async (req, res) =>{
    try{
        let blogs;
        const {state, authorId} = req.query
        let page = req.query.page || 0 //Here, the first page starts from zero
        let limit = req.query.limit || 3

        if (state === "published"){
            let blogsQuery = Blog.find({isDeleted: false, author: authorId, isPublished: true})
            blogs = await blogsQuery.skip(page*limit).limit(limit)
        }else{
            let blogsQuery = Blog.find({isDeleted: false, author: authorId, isPublished: false})
            blogs = await blogsQuery.skip(page*limit).limit(limit)
        }

        const resObj = {
            blogs, page: page=== 0 ? parseInt(page)+1 : page
            , limit, authorId, dataAmount: blogs.length
        }
        if (blogs) return res.status(200).json(resObj)
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


// IMPLEMENTED
// Create a blog into the Database
const createBlog = async (req, res) =>{
    try{
        const {title, authorId, description, body} = req.body;
        
        // This is to convert it to a mongoose  primary key Object for the User(Author) Model
        let authorObjId = new mongoose.Types.ObjectId(authorId)
    
        let blog = new Blog({
            title,
            author: authorObjId,
            description,
            body
        })
        await blog.save()
        
        return res.status(200).json({"message": "Blog Created Successfully"})
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
    
}


// IMPLEMENTED
// Publish a blog by the actual author that created it, by changing the state from the default Draft state to Published State
const publishABlog = async (req, res) =>{
    try{
        const {blogId, authorId} = req.body;

        let blog = await Blog.findOne({_id: blogId, isDeleted: false, isPublished: false, author: authorId})
        blog.isPublished = true
        blog.datePublished = Date.now()
        await blog.save()
        
        return res.status(200).json({"message": "Blog has been published successfully!!!"})
    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
}


// This is to allow an author to edit the Blog created by the Author alone
const updateAuthorBlog = async (req, res) =>{
    try{
        const {blogId, authorId, title, description, body} = req.body;

        let blog = await Blog.findOne({_id: blogId, isDeleted: false, author: authorId})
        if(blog){
            blog.title = title
            blog.description = description
            blog.body = body
            await blog.save()
            
            return res.status(200).json({"message": "Blog has been Updated successfully!!!"})
        }    
        return res.status(403).json({"message": "Blog update failed!!!"})

    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
}


// This is to allow an author to delete the Blog created by the Author alone
const deleteAuthorBlog = async (req, res) =>{
    try{
        const {blogId, authorId} = req.params;

        let blog = await Blog.findOne({_id: blogId, isDeleted: false, author: authorId})
        if(blog){
            blog.isDeleted = true
            blog.dateDeleted = Date.now()
            await blog.save()
            
            return res.status(200).json({"message": "Blog deleted successfully!!!"})
        }    
        return res.status(403).json({"message": "Blog deletion failed!!!"})

    }catch(ex){
        console.log(ex)
        return res.status(500).json({"message": "An Error Occured in the Server"})
    }
}


module.exports = {
    createBlog,
    getDraftBlogs,
    getAllBlogsByAuthorId,
    getPublishedBlogs,
    getAPublishedBlogById,
    updateAuthorBlog,
    publishABlog,
    deleteAuthorBlog
}