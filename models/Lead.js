const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  id:Number,
  name: String,
  email: String,
  phone:String,
  source:String
});

module.exports = mongoose.model('Lead', LeadSchema);