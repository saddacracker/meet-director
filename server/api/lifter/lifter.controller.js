'use strict';

var _ = require('lodash');
var mongoose = require('mongoose').Mongoose;
var Lifter = require('./lifter.model');
var Attempt = require('../attempt/attempt.model');

// Get list of lifters
exports.index = function(req, res) {
  Lifter.find(function (err, lifters) {
    if(err) { return handleError(res, err); }
    return res.json(200, lifters);
  });
};

// Get a single lifter
exports.show = function(req, res) {
  Lifter.findById(req.params.id, function (err, lifter) {
    if(err) { return handleError(res, err); }
    if(!lifter) { return res.send(404); }
    return res.json(lifter);
  });
};

// Get a single lifter
exports.showLifterAttempts = function(req, res) {
  Lifter.findById(req.params.id, function (err, lifter) {
    if(err) { return handleError(res, err); }
    if(!lifter) { return res.send(404); }
    return res.json(lifter.attempts);
  });
};

// Creates a new lifter in the DB.
exports.create = function(req, res) {
  Lifter.create(req.body, function(err, lifter) {
    if(err) { return handleError(res, err); }
    return res.json(201, lifter);
  });
};

// Updates an existing lifter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  
  
  
  
  Lifter.findById(req.params.id, function (err, lifter) {
    
    // lifter.attempts.push(attempt);
    
    console.log('attempt from request: ' + req.body.attempt);
    console.log('Attempt Object: ' + Attempt.findById(req.params.id));
    
    // check if there is an 'attempt' parameter
    if (req.body.attempt) {
      
      // @TODO: if id already exists, remove it from attempts?
      
      // @TODO: verify attempt id is valid 
      
      // @TODO: catch error if Attempt Object isn't valid
      
      // Add to this lifters attempts
      // var subDocument = myDocument.mySubdocuments.id(mySubDocumentId);
      lifter.attempts.push(req.body.attempt);
      // lifter.attempts.push(Attempt.findById(req.params.id));
      
    }
    
    // if (req.body.attempts) {
    //
    //     _.map(req.body.attempts, function(attempt) {
    //
    //         // push client id (converted from string to mongo object id) into clients
    //         lifter.attempts.push(attempt);
    //
    //     });
    //
    // }
    
    
    if (err) { return handleError(res, err); }
    if(!lifter) { return res.send(404); }
    var updated = _.merge(lifter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lifter);
    });
  });
};

// Deletes a lifter from the DB.
exports.destroy = function(req, res) {
  Lifter.findById(req.params.id, function (err, lifter) {
    if(err) { return handleError(res, err); }
    if(!lifter) { return res.send(404); }
    lifter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}