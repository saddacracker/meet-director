'use strict';

var express = require('express');
var controller = require('./lifter.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/attempts', controller.showLifterAttempts);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/:attempt_id', controller.updateAttempt);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;