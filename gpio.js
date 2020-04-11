const mysql = require('./mysql');
const rpio = require('rpio');
const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");
var rpioptions = {
        gpiomem: false,          /* Use /dev/mem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
}

rpio.init(rpioptions);

const softSPI = new SoftSPI({
  clock: 23, // pin number of SCLK
  mosi: 19, // pin number of MOSI
  miso: 21, // pin number of MISO
  client: 24 // pin number of CS
});

const mfrc522 = new Mfrc522(softSPI).setResetPin(22).setBuzzerPin(18);


var authorized = false;

//Tag ids that are authorized to start machines
var tagIds = [123456];

var pinsPhysical = [15,16,18,19];
var pinsTimeLeft = [0,0,0,0];

//Decrease timers every second
setInterval(function() {
	for (i = 0; i < pinsTimeLeft.length; ++i) {
		if (pinsTimeLeft[i] > 0) {
			pinsTimeLeft[i]--;
		}
	}
}, 1000);

//Get tag ids from DB that are authorized
var updateDbUserTagIds = function() {
	console.log('MOCK: Get user tag IDs from DB');
}

//Read tag and set authorized variable for 10s if tag is authorized
var readTag = function () {
	// console.log('MOCK: Read tag');
	//rpio.spiBegin();
//	rpio.spiChipSelect(0);                  /* Use CE0 */
//	rpio.spiSetCSPolarity(0, rpio.HIGH);    /* AT93C46 chip select is active-high */
//	rpio.spiSetClockDivider(128);           /* AT93C46 max is 2MHz, 128 == 1.95MHz */
//	rpio.spiSetDataMode(0);
	/*
	 * There are various magic numbers below.  A quick overview:
	 *
	 *   tx[0] is always 0x3, the EEPROM READ instruction.
	 *   tx[1] is set to var i which is the EEPROM address to read from.
	 *   tx[2] and tx[3] can be anything, at this point we are only interested in
	 *     reading the data back from the EEPROM into our rx buffer.
	 *
	 * Once we have the data returned in rx, we have to do some bit shifting to
	 * get the result in the format we want, as the data is not 8-bit aligned.
 	*/
/*
	var tx = new Buffer([0x3, 0x0, 0x00, 0x00]);
	var rx = new Buffer(4);
	var out;
	var i, j = 0;

	for (i = 0; i < 128; i++, ++j) {
        tx[1] = i;
        rpio.spiTransfer(tx, rx, 4);
        out = ((rx[2] << 1) | (rx[3] >> 7));
        // console.log(out.toString(16) + ((j % 16 == 0) ? '\n' : ' '));
	}
	rpio.spiEnd();
*/

//# reset card
  mfrc522.reset();

  //# Scan for cards
  let response = mfrc522.findCard();
  if (!response.status) {
    console.log("No Card");
    return;
  }
  //console.log("Card detected, CardType: " + response.bitSize);

  //# Get the UID of the card
  response = mfrc522.getUid();
  if (!response.status) {
    console.log("UID Scan Error");
    return;
  }

//# If we have the UID, continue
  const uid = response.data;
  console.log(
    "Card read UID: %s %s %s %s",
    uid[0].toString(16),
    uid[1].toString(16),
    uid[2].toString(16),
    uid[3].toString(16)
  );

  //# Stop
  mfrc522.stopCrypto();
}

//Returns if read tag id is authorized
// var authorizedFunc = function() {
// 	return authorized;
// }

var startMachine = function(machineId) {
	//Get tagId for logging and verify correct user
	// var tagId = req.query.tagId;
	// console.log(tagId);

	//Set pin to high
	//TODO
	rpio.open(pinsPhysical[machineId], rpio.OUTPUT);
	rpio.write(pinsPhysical[machineId], rpio.HIGH);

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
exports.authorized = authorized;
exports.startMachine = startMachine;
exports.pinsTimeLeft = pinsTimeLeft;
