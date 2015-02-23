'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var LifterSchema = new Schema({
  updated: { type: Date, default: Date.now },
  fName: String,
  lName: String,
  bodyWeight: Number,
  age: Number,
  sex: String,
  rackHeightSquat: Number,
  rackHeightBench: Number,
  teamName: String,
  attempts: [{type:mongoose.Schema.Types.ObjectId, ref:'Attempt'}]
});

module.exports = mongoose.model('Lifter', LifterSchema);


// http://stackoverflow.com/questions/23627976/mongoose-how-to-insert-a-single-subdocument-not-an-array