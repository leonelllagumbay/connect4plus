const express = require('express');
const http = require('http');
const path = require('path');

//const api = require('./server/routes/api');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);


// Socket IO
// var io = require('socket.io')(server);
// io.on('connection', function(socket) {
// 	socket.emit('msg', {
// 		msg: 'Welcome bro!'
// 	});
// 	socket.on('msg', function(msg) {
// 		socket.emit('msg', {
// 			msg: msg
// 		});
// 	})
// });

server.listen(port, () => console.log('Running'));
