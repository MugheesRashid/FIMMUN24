const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://MUN24:mun.com@muncluster.cinld.mongodb.net/");

const userSchema = new mongoose.Schema({
  fullname: {
      type: String,
     required: true,
  },
  userId: {
    type: String,
  },
  trackingId: {
    type: String,
    unique: true
  },
  institute: {
    type: String,
  },
  number: {
    type: String,
  },
  deligationType: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
  },
  paymentProof:{
    type: String,
  },
  experience:{
    type: String,
  },
  committee: { 
    type: String, 
    enum: ['UNHRC', 'UNSC', 'PNA', 'UNCSW', 'ECOSOC', 'UNESCO', 'DISEC'], // Only UNHRC and UNSC
  },
  country: {
    type: String,
  },
  adminNote: {
    type: String
  },
  userAdmin:{
    type: String
  },
  cnic:{
    type: String,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;