const express = require('express');
const path = require('path')
const routes = require('./routes/index');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const gpio = require('./gpio');
const mysql = require('./mysql');

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
	if (prevValue != gpio.authorized()) {
		console.log('Sending auth to client: '+gpio.authorized());
		prevValue = gpio.authorized();
		io.emit('authorized', gpio.authorized());
	}
}, 100);


module.exports = http;