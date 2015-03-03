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
        
    // for each lifter.attempts 
        // lifter.attempts(lifter.attempts[i])
    return res.json(lifter.attempts.id());
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
        
    if (err) { return handleError(res, err); }
    if(!lifter) { return res.send(404); }
    var updated = _.merge(lifter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lifter);
    });
  });
};


// Updates an existing lifter's attempt
// http://localhost:9000/api/lifters/54f5041191caf1832c084f63/54f5118262bd982b2dc58002

// @NOTE: THis might help? http://stackoverflow.com/questions/13026486/how-to-populate-a-sub-document-in-mongoose-after-creating-it
exports.updateAttempt = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  
  Lifter.findById(req.params.id, function (err, lifter) {
        
    // lifter.attempts.push(req.params.attempt_id);
    
    // check if there is an 'attempt' parameter
    if (req.params.attempt_id) {

      console.log('attempt from request is %s', req.params.attempt_id);
      //console.log('Attempt Object: ' + Attempt.find(req.body.attempt));

      Attempt.findById( req.params.attempt_id, function (err, attempt) {

        if (err) { return handleError(res, err); }
        if(!attempt) { return res.send(404); }
        console.log('attempt %s', attempt);
        console.log('lifter %s', lifter);
        console.log('lifter.attempts %s', lifter.attempts);
        
        // NOT GETTING CALLED????
        lifter.attempts.push( req.params.attempt_id ); 
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