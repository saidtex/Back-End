const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  link: {type: String, required: true},
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  categorie1: { type: String },
  categorie2: { type: String},
  categorie3: { type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
