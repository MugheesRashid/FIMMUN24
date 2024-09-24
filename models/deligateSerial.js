const mongoose = require('mongoose');

const delegateSerialSchema = new mongoose.Schema({
  nextSerial: { type: Number, default: 1 }
});

const DelegateSerial = mongoose.model('DelegateSerial', delegateSerialSchema);
module.exports = DelegateSerial;