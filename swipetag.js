setTimeout(function(){document.location = document.referrer},5000);

var dots = window.setInterval( function() {
    var wait = document.getElementById("wait");
    if ( wait.innerHTML.length > 3 ) 
        wait.innerHTML = "";
    else 
        wait.innerHTML += ".";
    }, 200);

var rmn = document.getElementById("replaceMachineName");
var machineName = window.location.search.split("=")[1];
rmn.innerText = "Maskin "+machineName;