const yup = require("yup")

let blogDataSchema = yup.object().shape({
  authorId: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
//   age: yup.number().positive().integer().min(18).default(18)/
});


let editBlogDataSchema = yup.object().shape({
  blogId: yup.string().required(),
  authorId: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
});


let deleteBlogDataSchema = yup.object().shape({
  blogId: yup.string().required(),
  authorId: yup.string().required(),
});


module.exports = {blogDataSchema, editBlogDataSchema, deleteBlogDataSchema}

