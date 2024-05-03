const Blog = require('../models/blog');

exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: 'Blog not found' });
  }};

  
exports.getOne = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: 'Blog not found' });
  }};

  
exports.createBlog = async (req, res) => {
  try {  
    const blog = new Blog({
      link: req.body.link,
      image1: req.body.image1,
      image2: req.body.image2,
      categorie1: req.body.categorie1,
      categorie2: req.body.categorie2,
      categorie3: req.body.categorie3,
    });
    await blog.save();
    res.status(201).json({ message: 'Blog saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.link = req.body.link;
    blog.image1 = req.body.image1;
    blog.image2 = req.body.image2; 
    blog.categorie = req.body.categorie;
    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating Blog' });
  }
};


exports.deleteBlog = async (req, res) => {
  try{
  await Blog.deleteOne({_id: req.params.id});
  res.status(201).json({ message: 'Blog deleted successfully!' });
  }
  catch (error) {
    res.status(400).json({ message: 'Blog not found' });
  }};
