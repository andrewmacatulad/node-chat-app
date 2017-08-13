const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express');



const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)

const {generateMessage, generateLocationMessage} = require('./utils/message')


app.use(express.static(publicPath))

// event listener
io.on('connection', (socket) => {
	console.log('New User Connected')

	// // emit event
	// socket.emit('newMessage', {
	// 	from: 'Gago',
	// 	text: 'Fuck you',
	// 	createdAt: 123
	// });

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
// socket.emit from Admin text Welcome to the chat app
// socket.broadcast.emit from Admin text New user joined

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from server');

		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })

// This will emit from Admin text Welcome to the chat app
		// io.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

// this will emit from Admin text New user joined
		// socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
	})


	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	})

	socket.on('disconnect', () => {
		console.log('Client Disconnected')
	})

})



server.listen(port, () => {
	console.log('Server Running in Port 3000')
})