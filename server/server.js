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

	// // emit event
	// socket.emit('newMessage', {
	// 	from: 'Gago',
	// 	text: 'Fuck you',
	// 	createdAt: 123
	// });

// socket.emit from Admin text Welcome to the chat app
// socket.broadcast.emit from Admin text New user joined

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })

		io.emit('newMessage', {
			from: 'Admin',
			text: 'Welcome to the chat app',
			createdAt: new Date().getTime()
		})

		socket.broadcast.emit('newMessage', {
			from: 'Admin',
			text: 'New user Joined',
			createdAt: new Date().getTime()
		})

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})


})



server.listen(port, () => {
	console.log('Server Running in Port 3000')
})