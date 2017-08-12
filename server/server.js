const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)

app.use(express.static(publicPath))

// event listener
io.on('connection', (socket) => {
	console.log('New User Connected')
	socket.on('disconnect', () => {
		console.log('Client Disconnected')
	})

	// emit event
	socket.emit('newMessage', {
		from: 'Gago',
		text: 'Fuck you',
		createdAt: 123
	});

	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
	})


})



server.listen(port, () => {
	console.log('Server Running in Port 3000')
})