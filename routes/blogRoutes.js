const express = require("express");
const app = express()
const router = express.Router()
const limiter = require("../middlewares/rateLimiter")
const authenticateToken = require("../middlewares/authenticateToken")
const {validateEditBlogData, validateNewBlogData, validateDeleteBlogData} = require("../middlewares/validateBlogData")
const {createBlog, getDraftBlogs, getPublishedBlogs, searchPublishedBlogs, updateAuthorBlog, deleteAuthorBlog,  getAPublishedBlogById, getAllBlogsByAuthorId, publishABlog} = require("../controllers/blogController")


router.get("/get", limiter, authenticateToken, getDraftBlogs)
 
router.get("/get/published", limiter, getPublishedBlogs)

router.get("/get/published/:publishedBlogId", limiter, getAPublishedBlogById)

router.get("/search/", limiter, searchPublishedBlogs)

router.get("/get/list/", limiter, authenticateToken, getAllBlogsByAuthorId)
// router.get("/get/:state", limiter, authenticateToken, getAllBlogsByAuthorId)

router.post("/create", limiter, authenticateToken, validateNewBlogData, createBlog)

router.post("/edit", limiter, authenticateToken, validateEditBlogData, updateAuthorBlog)
// router.post("/edit", limiter, authenticateToken, validateEditBlogData, updateAuthorBlog)

router.post("/publish/", limiter, authenticateToken, publishABlog)
// router.post("/publish/", limiter, authenticateToken, publishABlog)

router.delete("/delete/:blogId/:authorId", limiter, authenticateToken, validateDeleteBlogData, deleteAuthorBlog)
// router.delete("/delete/", limiter, authenticateToken, validateDeleteBlogData, deleteAuthorBlog)



module.exports = router;