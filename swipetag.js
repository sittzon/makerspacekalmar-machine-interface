setTimeout(function(){document.location = document.referrer},5000);

var switchDirection = true;

var dots = window.setInterval( function() {
    var wait = document.getElementById("wait");
    
    if (switchDirection && wait.innerHTML.length < 4) {
    	wait.innerHTML += ".";
    }
    else if (!switchDirection && wait.innerHTML.length > 0) {
        wait.innerHTML = wait.innerHTML.substring(0, wait.innerHTML.length-1);
    }
    else {
    	switchDirection = !switchDirection;
    }
	}, 200);

var rmn = document.getElementById("replaceMachineName");
rmn.innerHTML = decodeURI(window.location.search.split("=")[1]);