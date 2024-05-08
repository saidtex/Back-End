const Partner = require('../models/partner');

exports.getAll = async (req, res) => {
  try {
    const partners = await Blog.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(400).json({ message: 'partner not found' });
  }};

exports.createPartner = async (req, res) => {
  try {  
    const partner = new Partner({
      link: req.body.link,
      image1: req.body.image1,
      image2: req.body.image2,
      categorie1: req.body.categorie1,
      categorie2: req.body.categorie2,
      categorie3: req.body.categorie3,
    });
    await partner.save();
    res.status(201).json({ message: 'partner saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }};

exports.updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findOne({ _id: req.params.id });
    if (!partner) {
      return res.status(404).json({ message: 'partner not found' });
    }
    partner.link = req.body.link;
    partner.image1 = req.body.image1;
    partner.image2 = req.body.image2; 
    partner.categorie = req.body.categorie;
    await partner.save();
    res.status(200).json({ message: 'partner updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating partner' });
  }
};

exports.deletePartner = async (req, res) => {
  try{
  await Partner.deleteOne({_id: req.params.id});
  res.status(201).json({ message: 'partner deleted successfully!' });
  }
  catch (error) {
    res.status(400).json({ message: 'partner not found' });
  }};
