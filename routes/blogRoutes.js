const express = require("express");
const app = express()
const router = express.Router()
const authenticateToken = require("../middlewares/authenticateToken")
const {validateEditBlogData, validateNewBlogData, validateDeleteBlogData} = require("../middlewares/validateBlogData")
const {createBlog, getDraftBlogs, getPublishedBlogs, updateAuthorBlog, deleteAuthorBlog,  getAPublishedBlogById, getAllBlogsByAuthorId, publishABlog} = require("../controllers/blogController")


router.get("/get", getDraftBlogs)
 
router.get("/get/published", getPublishedBlogs)

router.get("/get/published/:publishedBlogId", getAPublishedBlogById)

router.get("/get/blogs/", getAllBlogsByAuthorId)
// router.get("/get/:state", authenticateToken, getAllBlogsByAuthorId)

router.post("/create", authenticateToken, validateNewBlogData, createBlog)

router.post("/edit", validateEditBlogData, updateAuthorBlog)
// router.post("/edit", authenticateToken, validateEditBlogData, updateAuthorBlog)

router.post("/publish/", publishABlog)
// router.post("/publish/", authenticateToken, publishABlog)

router.delete("/delete/:blogId/:authorId", validateDeleteBlogData, deleteAuthorBlog)
// router.delete("/delete/", authenticateToken, validateDeleteBlogData, deleteAuthorBlog)




module.exports = router;