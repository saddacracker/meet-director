'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetSchema = new Schema({
  updated: { type: Date, default: Date.now },
  title: String,
  city: String,
  state: String,
  address: String,
  isKilos: { type: Boolean, default: true },
  meetDate: Date,
  flights: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight'}
});

// assign a function to the "methods" object of our MeetSchema
MeetSchema.methods.addFlight = function (cid) {
  // return this.model('Meet').find({ type: this.type }, callback);
  
  // user.clients.push(mongoose.Types.ObjectId(cid));
  
  this.model('Meet').flights.push(mongoose.Types.ObjectId(cid));
}

module.exports = mongoose.model('Meet', MeetSchema);