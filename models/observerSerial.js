const mongoose = require('mongoose');

const observerSerialSchema = new mongoose.Schema({
  nextSerial: { type: Number, default: 1 }
});

const ObserverSerial = mongoose.model('ObserverSerial', observerSerialSchema);
module.exports = ObserverSerial;