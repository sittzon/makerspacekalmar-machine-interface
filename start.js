const express = require('express');
const path = require('path')
const routes = require('./routes/index');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const gpio = require('./gpio');
const open = require('open');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', routes);
app.use(express.static('public'));

const server = http.listen(3000, () => {
	console.log(`Express is running on port ${server.address().port}`);
});

//Read tag every 100ms
var prevValue = false;
setInterval(function(){
	gpio.readTag();
	//Send value to client only if value changed
	if (prevValue != gpio.authorized) {
		console.log('Sending auth to client: '+gpio.authorized);
		prevValue = gpio.authorized;
		io.emit('authorized', gpio.authorized);
	}
}, 100);

//Trigger on message 'startMachine'
io.on('connection', function(socket) {
	socket.on('startMachine', function(msg) {
		console.log('Starting machine ' + msg);
		gpio.startMachine(msg);
		io.emit('machineStarted');
	});
});

// Open in Chrome if 'chromekiosk' is specified
if (process.argv[2] == "chromekiosk") {
	var chrome = ""
	if (`${process.platform}` == 'darwin') {
		chrome = 'google chrome'
	} else {
		chrome = 'chromium-browser'
	}

	open('http://localhost:3000', {app: [chrome, '--kiosk']});
}

module.exports = http;