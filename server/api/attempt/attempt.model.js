// 'use strict';
//
// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;
//
// var AttemptSchema = new Schema({
//   updated: { type: Date, default: Date.now },
//   liftName: { type: String, enum: ['Squat', 'Bench', 'Deadlift'] },
//   attempt: Number,
//   weight: Number,
//   passed: { type: Boolean, default: true },
//   redo: { type: Boolean, default: false },
//   isKilos: { type: Boolean, default: true },
//   lifter : {type:mongoose.Schema.Types.ObjectId, ref:'Lifter'}
// });
//
// module.exports = mongoose.model('Attempt', AttemptSchema);