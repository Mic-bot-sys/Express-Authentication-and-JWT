const {blogDataSchema, editBlogDataSchema, deleteBlogDataSchema} = require("./blog")


// This is the middleware function that will validate the blog data when a new blog is about to be created
async function validateNewBlogData(req, res, next) {
    try {
         req.body = await blogDataSchema.validate(req.body);
         next();
    } catch (err) {
        console.error(err);
        res.status(400).json({"message": err.message})
    }
}


// This is the middleware function that will validate the data coming for the purpose of editing the blog data
async function validateEditBlogData(req, res, next) {
    try {
         req.body = await editBlogDataSchema.validate(req.body);
         next();
    } catch (err) {
        console.error(err);
        res.status(400).json({"message": err.message})
    }
}


// This is to validate the data request to delete the blog created by the author 
async function validateDeleteBlogData(req, res, next) {
    try {
         req.params = await deleteBlogDataSchema.validate(req.params);
         next();
    } catch (err) {
        console.error(err);
        res.status(400).json({"message": err.message})
    }
}

module.exports = {validateNewBlogData, validateEditBlogData, validateDeleteBlogData}