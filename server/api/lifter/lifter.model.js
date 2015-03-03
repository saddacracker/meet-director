'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var AttemptSchema = new Schema({
  updated: { type: Date, default: Date.now },
  liftName: { type: String, enum: ['Squat', 'Bench', 'Deadlift'] },
  attempt: Number,
  weight: Number,
  passed: { type: Boolean, default: true },
  redo: { type: Boolean, default: false },
  isKilos: { type: Boolean, default: true },
  lifter : {type:mongoose.Schema.Types.ObjectId, ref:'Lifter'}
});

var LifterSchema = new Schema({
  updated: { type: Date, default: Date.now },
  fName: String,
  lName: String,
  bodyWeight: Number,
  age: Number,
  sex: { type: String, enum: ['Male', 'Female'] },
  rackHeightSquat: Number,
  rackHeightBench: Number,
  teamName: String,
  attempts: [{type:mongoose.Schema.Types.ObjectId, ref:'Attempt'}]
});

module.exports = mongoose.model('Lifter', LifterSchema);


// http://stackoverflow.com/questions/23627976/mongoose-how-to-insert-a-single-subdocument-not-an-array