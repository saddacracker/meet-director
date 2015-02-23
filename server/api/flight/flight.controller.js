'use strict';

var _ = require('lodash');
var Flight = require('./flight.model');

// Get list of flights
exports.index = function(req, res) {
  Flight.find(function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

// Get a single flight
exports.show = function(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

// Creates a new flight in the DB.
exports.create = function(req, res) {
  Flight.create(req.body, function(err, flight) {
    if(err) { return handleError(res, err); }
    return res.json(201, flight);
  });
};

// Updates an existing flight in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Flight.findById(req.params.id, function (err, flight) {
    if (err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    var updated = _.merge(flight, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, flight);
    });
  });
};

// Deletes a flight from the DB.
exports.destroy = function(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    flight.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}