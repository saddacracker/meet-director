'use strict';

var _ = require('lodash');
var mongoose = require('mongoose').Mongoose;
var Attempt = require('../attempt/attempt.model');
var Lifter = require('./lifter.model');

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
    

    
    // check if there is an 'attempt' parameter
    if (req.body.attempt) {
      
      console.log('attempt from request is %s', req.body.attempt);
      //console.log('Attempt Object: ' + Attempt.find(req.body.attempt));
      
      Attempt.findById( req.body.attempt, function (err, attempt) {
        
        if (err) { return handleError(res, err); }
        if(!attempt) { return res.send(404); }
        console.log('attempt %s', attempt);
        lifter.attempts.push(req.body.attempt); // NOT GETTING CALLED?
      });
      
      // @TODO: if id already exists, remove it from attempts?
      
      // @TODO: verify attempt id is valid 
      
      // @TODO: catch error if Attempt Object isn't valid
      
    }
    
    
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