'use strict';

var _ = require('lodash');
var Attempt = require('./attempt.model');

// Get list of attempts
exports.index = function(req, res) {
  Attempt.find(function (err, attempts) {
    if(err) { return handleError(res, err); }
    return res.json(200, attempts);
  });
};

// Get a single attempt
exports.show = function(req, res) {
  Attempt.findById(req.params.id, function (err, attempt) {
    if(err) { return handleError(res, err); }
    if(!attempt) { return res.send(404); }
    return res.json(attempt);
  });
};

// Creates a new attempt in the DB.
exports.create = function(req, res) {
  Attempt.create(req.body, function(err, attempt) {
    if(err) { return handleError(res, err); }
    return res.json(201, attempt);
  });
};

// Updates an existing attempt in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attempt.findById(req.params.id, function (err, attempt) {
    if (err) { return handleError(res, err); }
    if(!attempt) { return res.send(404); }
    var updated = _.merge(attempt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attempt);
    });
  });
};

// Deletes a attempt from the DB.
exports.destroy = function(req, res) {
  Attempt.findById(req.params.id, function (err, attempt) {
    if(err) { return handleError(res, err); }
    if(!attempt) { return res.send(404); }
    attempt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}