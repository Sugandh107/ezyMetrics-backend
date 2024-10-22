const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: String,
  clicks: Number,
  conversions: Number,
});
module.exports=mongoose.model('Campaign',CampaignSchema);