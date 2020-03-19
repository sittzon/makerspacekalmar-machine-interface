const app = require('express');
const router = app.Router();
const rpio = require('rpio');

var rpioptions = {
        gpiomem: false,          /* Use /dev/mem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
}

rpio.init(rpioptions);

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']
var pinsPhysical = [15,16,18,19];
var pinsTimeLeft = [0,0,0,0];

var authorized = false;

//Decrease timers every second
setInterval(function(){
	for (i = 0; i < pinsTimeLeft.length; ++i) {
		if (pinsTimeLeft[i] > 0) {
			pinsTimeLeft[i]--;
		}
	}
},1000);

//Read tag and authorize
var readTag = function (req, res, next) {
	console.log('MOCK: Read tag');
	//Read tag. If authorized -> Set authorized to on and send to client
}

var getDbUserTagIds = function(req, res, next) {
	console.log('MOCK: Get user tag IDs from DB');
	next();
}

//Get machine names and pinsPhysical from DB
var getDbMachineNames = function(req, res, next) {
	console.log('MOCK: Get machine names from DB');
	next();
}

//Start machine and set timer
var startMachine = function (req, res, next) {
	var machineId = req.query.machineId;

	//Get tagId for logging and verify correct user
	// var tagId = req.query.tagId;
	// console.log(tagId);

	//Set pin to high
	//TODO
	// rpio.open(pinsPhysical[pinNr], rpio.OUTPUT);
	// rpio.write(pinsPhysical[machineId], rpio.HIGH);

	//Set timer to 60s
	pinsTimeLeft[machineId] = 60;
	next();
}

var renderRoot = function (req, res, next) {
	res.render('body', {machineNames: machineNames, pinsTimeLeft: pinsTimeLeft, authorized: authorized});
}

//Start machine
router.get('/startMachine', [startMachine, renderRoot]);

//Root view, choose machine
router.get('/', [renderRoot]);


module.exports = router;