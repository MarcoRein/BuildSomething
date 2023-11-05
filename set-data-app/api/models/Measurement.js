const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const measurementSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Number, required: true },
    measuredvalue: { type: Number, required: true }
});

measurementSchema.index({ contents: 1 });

module.exports = mongoose.model('Measurement', measurementSchema);