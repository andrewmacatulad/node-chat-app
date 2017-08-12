var socket = io();

	socket.on('connect', () => {
		console.log('Connect to the server')

		// socket.emit('createMessage', {
		// 	from: 'Tanga',
		// 	text: 'Hey, Fuck'
		// })
	})

	socket.on('disconnect', () => {
		console.log('Disconnected from the server')
	})

	socket.on('newMessage', (message) => {
		console.log('New Message', message);
	})

