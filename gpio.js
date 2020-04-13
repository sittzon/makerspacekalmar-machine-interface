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

var pinsPhysical = [15,16,18,19];
var pinsTimeLeft = [0,0,0,0];

//Decrease timers every second
setInterval(function() {
	for (i = 0; i < pinsTimeLeft.length; ++i) {
		if (pinsTimeLeft[i] >= 0) {
			pinsTimeLeft[i]--;
		}
	}

  for (i = 0; i < pinsTimeLeft.length; ++i) {
    if (pinsTimeLeft[i] == 0) {
      stopMachine(i);
    }
  }
}, 1000);

//Read tag and return tagId
var readTag = function () {
  //# reset card
  mfrc522.reset();

  //# Scan for cards
  let response = mfrc522.findCard();
  if (!response.status) {
    return "";
  }

  //# Get the UID of the card
  response = mfrc522.getUid();
  if (!response.status) {
    console.log("UID Scan Error");
    return "";
  }

//# If we have the UID, continue
  const uid = response.data;
  // console.log(
  //   "UID: %s %s %s %s",
  //   uid[0].toString(8),
  //   uid[1].toString(8),
  //   uid[2].toString(8),
  //   uid[3].toString(8)
  // );

  //# Stop
  mfrc522.stopCrypto();
	
  return uid[0].toString(8)+uid[1].toString(8)+uid[2].toString(8)+uid[3].toString(8)
}

var startMachine = function(machineId) {
  console.log("Starting machine "+machineId);

	//Set pin to high
	rpio.open(pinsPhysical[machineId], rpio.OUTPUT);
	rpio.write(pinsPhysical[machineId], rpio.HIGH);

	//Set timer to 60s
	pinsTimeLeft[machineId] = 60;
}

var stopMachine = function(machineId) {
  console.log("Stopping machine "+machineId);

  //Set pin to low  
  rpio.open(pinsPhysical[machineId], rpio.OUTPUT);
  rpio.write(pinsPhysical[machineId], rpio.LOW);
}

exports.readTag = readTag;
exports.startMachine = startMachine;
exports.pinsTimeLeft = pinsTimeLeft;
