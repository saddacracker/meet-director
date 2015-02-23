'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FlightSchema = new Schema({
  updated: { type: Date, default: Date.now },
  name: String,
  lifters: {type: mongoose.Schema.Types.ObjectId, ref: 'Lifter'}
});

module.exports = mongoose.model('Flight', FlightSchema);