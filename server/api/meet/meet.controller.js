'use strict';

var _ = require('lodash');
var Meet = require('./meet.model');

// Get list of meets
exports.index = function(req, res) {
  Meet.find(function (err, meets) {
    if(err) { return handleError(res, err); }
    return res.json(200, meets);
  });
};

// Get a single meet
exports.show = function(req, res) {
  Meet.findById(req.params.id, function (err, meet) {
    if(err) { return handleError(res, err); }
    if(!meet) { return res.send(404); }
    return res.json(meet);
  });
};

// Creates a new meet in the DB.
exports.create = function(req, res) {
  Meet.create(req.body, function(err, meet) {
    if(err) { return handleError(res, err); }
    return res.json(201, meet);
  });
};

// Updates an existing meet in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Meet.findById(req.params.id, function (err, meet) {
    if (err) { return handleError(res, err); }
    if(!meet) { return res.send(404); }
    var updated = _.merge(meet, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, meet);
    });
  });
};

// Deletes a meet from the DB.
exports.destroy = function(req, res) {
  Meet.findById(req.params.id, function (err, meet) {
    if(err) { return handleError(res, err); }
    if(!meet) { return res.send(404); }
    meet.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}