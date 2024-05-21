const yup = require("yup")

let blogDataSchema = yup.object().shape({
  authorId: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.array().min(1, "at least 1")
});


let editBlogDataSchema = yup.object().shape({
  blogId: yup.string().required(),
  authorId: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.array().min(1, "at least 1")

});


let deleteBlogDataSchema = yup.object().shape({
  blogId: yup.string().required(),
  authorId: yup.string().required(),
});


module.exports = {blogDataSchema, editBlogDataSchema, deleteBlogDataSchema}

