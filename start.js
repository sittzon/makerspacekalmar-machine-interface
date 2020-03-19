const express = require('express');
const path = require('path')
const routes = require('./routes/index');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', routes);
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
});

const server = http.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});