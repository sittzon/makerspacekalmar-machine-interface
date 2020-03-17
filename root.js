var selectionMode = false;

function getElementsStartsWithId( id ) {
  var children = document.body.getElementsByTagName('*');
  var elements = [], child;
  for (var i = 0, length = children.length; i < length; i++) {
    child = children[i];
    if (child.id.substr(0, id.length) == id)
      elements.push(child);
  }
  return elements;
}

function selectionModeOn() {
	var machineButtons = getElementsStartsWithId('machineButton');
	for (i = 0; i < machineButtons.length; i++) {
		machineButtons[i].classList.remove('btn-default');
		machineButtons[i].disabled = false;
		machineButtons[i].classList.add('btn-primary');
	}
	selectionMode = true;
}

function decreasePinsTimeLeft() {
	var pinsTimeLeft = document.getElementById("pinsTimeLeft");
	var timeLeft = pinsTimeLeft.innerHTML.split(',');
	var timeLeftResult = "";

	for (i = 0; i < timeLeft.length; i++) {
		var timeLeftInt = parseInt(timeLeft[i]);
		if (timeLeftInt > 0) {
			timeLeftInt -= 1;
		}
		timeLeftResult += timeLeftInt.toString()
		if (i < timeLeft.length - 1) {
			timeLeftResult += ',';
		}
	}
	timeLeftResult = timeLeftResult.substr(0, timeLeftResult.length);
	console.log('Time Left: ' + timeLeftResult);
	pinsTimeLeft.innerHTML = timeLeftResult;
};

function updateButtonClasses() {
	var pinsTimeLeft = document.getElementById("pinsTimeLeft");
	var machineButtons = getElementsStartsWithId('machineButton');
	var timeLeft = pinsTimeLeft.innerHTML.split(',');

	for (i = 0; i < timeLeft.length; i++) {
		var timeLeftInt = parseInt(timeLeft[i]);
		if (selectionMode) {
			machineButtons[i].disabled = false;
		}
		else {
			machineButtons[i].disabled = true;
		}

		if (timeLeftInt > 0) {
			machineButtons[i].classList.remove('btn-default');
			machineButtons[i].classList.add('btn-success');
		}
		else if (timeLeftInt == 0) {
			machineButtons[i].classList.remove('btn-success');
			machineButtons[i].classList.add('btn-default');
		}
	}
}

function updateButtonText() {

}


function updateTimerAndButtons() {
	decreasePinsTimeLeft();
	updateButtonClasses();
	updateButtonText();
}

setInterval(function() {
	updateTimerAndButtons();
}, 1000);


updateButtonClasses();