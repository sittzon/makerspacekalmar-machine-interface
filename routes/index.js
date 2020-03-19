const app = require('express');
const router = app.Router();
const gpio = require('../gpio');

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']

//Start machine and set timer
var startMachine = function (req, res, next) {
	gpio.startMachine(req.query.machineId);
	next();
}

var renderRoot = function (req, res, next) {
	res.render('body', {machineNames: machineNames, pinsTimeLeft: gpio.pinsTimeLeft});
}

//Start machine
router.get('/startMachine', [startMachine, renderRoot]);

//Root view, choose machine
router.get('/', [renderRoot]);

module.exports = router;