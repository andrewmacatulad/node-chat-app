const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)
const users = new Users();



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


// socket.emit from Admin text Welcome to the chat app
// socket.broadcast.emit from Admin text New user joined

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required')
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList' , users.getUserList(params.room));
		// socket.leave('The Office Fans')
		

		// io.emit -> io.to('The Office Fans').emit
		// socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
		// socket.emit // this is for specific user only so you can't use it for the room

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
		callback();
	})

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if(user && isRealString(message.text)) {
			// the io.to so it can only emit on the user.room and not on any room
			// then generate a newMessage with the username and text if you message something
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
 		
		callback();

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
		var user = users.getUser(socket.id);

		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
		}
	})

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	})

})



server.listen(port, () => {
	console.log('Server Running in Port 3000')
})