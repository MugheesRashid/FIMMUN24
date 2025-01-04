const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect(process.env.DB_Link);

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});
adminSchema.plugin(plm);

module.exports = mongoose.model('Admin', adminSchema);
