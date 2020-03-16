const express = require('express');
const router = express.Router();
const rpio = require('rpio');

var rpioptions = {
        gpiomem: false,          /* Use /dev/mem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
}

rpio.init(rpioptions);

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']
var pinsPhysical = [15,16,18,19];
var pinsPhysicalStatus = [0,0,0,0];
var pinsTimeLeft = [0,0,0,0];

//Get machine names and pinsPhysical from DB
var getDbMachineNames = function(req, res, next) {
	console.log('MOCK: Get machine names from DB');
	next();
}

//Tag swipe view
var renderSwipeTag = function (req, res, next) {
	res.render('swipeTag');
	next();
}

//Read tag
var readTag = function (req, res) {
	console.log('MOCK: Read tag');
}

//Read pinsPhysical
var readPinsPhysical = function (req, res, next) {
	console.log('Reading pinsPhysicalStatus')
	for (i = 0; i < pinsPhysical.length; ++i) {
		rpio.open(pinsPhysical[i], rpio.INPUT);
		pinsPhysicalStatus[i] = rpio.read(pinsPhysical[i]);
	}
	pinsPhysicalStatus[2] = 1;
	pinsTimeLeft[2] = 10;
	next();
}

var renderRoot = function (req, res, next) {
	res.render('root', {machineNames: machineNames, pinStatus: pinsPhysicalStatus, pinsTimeLeft: pinsTimeLeft});
}

//Swipe tag view
router.get('/swipeTag', [renderSwipeTag, readTag]);

//Root view, choose machine
router.get('/', [getDbMachineNames, readPinsPhysical, renderRoot]);

module.exports = router;