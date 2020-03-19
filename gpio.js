const rpio = require('rpio');
var rpioptions = {
        gpiomem: false,          /* Use /dev/mem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
}

rpio.init(rpioptions);

var authorized = false;

//Tag ids that are authorized to start machines
var tagIds = [123456];

var pinsPhysical = [15,16,18,19];
var pinsTimeLeft = [0,0,0,0];

//Decrease timers every second
setInterval(function(){
	for (i = 0; i < pinsTimeLeft.length; ++i) {
		if (pinsTimeLeft[i] > 0) {
			pinsTimeLeft[i]--;
		}
	}
},1000);

//Get tag ids from DB that are authorized
var updateDbUserTagIds = function() {
	console.log('MOCK: Get user tag IDs from DB');
}

//Read tag and set authoried variable if tag is authorized
var readTag = function () {
	// console.log('MOCK: Read tag');
}

//Returns if read tag id is authorized
var authorizedFunc = function() {
	return authorized;
}

var startMachine = function(machineId) {
	//Get tagId for logging and verify correct user
	// var tagId = req.query.tagId;
	// console.log(tagId);

	//Set pin to high
	//TODO
	// rpio.open(pinsPhysical[pinNr], rpio.OUTPUT);
	// rpio.write(pinsPhysical[machineId], rpio.HIGH);

	//Set timer to 60s
	pinsTimeLeft[machineId] = 60;
}

//Update tag id once every minute
setInterval(function(){
	updateDbUserTagIds();
}, 60000);


//Update user tag Id's when app starts
updateDbUserTagIds();

exports.readTag = readTag;
exports.authorized = authorizedFunc;
exports.startMachine = startMachine;
exports.pinsTimeLeft = pinsTimeLeft;