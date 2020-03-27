const app = require('express');
const router = app.Router();
const gpio = require('../gpio');
const mysql = require('../mysql');

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']

var renderRoot = function (req, res, next) {
	res.render('body', {machineNames: machineNames, pinsTimeLeft: gpio.pinsTimeLeft});
}

//Root view, choose machine
router.get('/', [renderRoot]);

module.exports = router;