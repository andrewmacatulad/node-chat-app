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
		var li = jQuery('<li></li>')
		li.text(`${message.from}: ${message.text}`);

		jQuery('#messages').append(li);
	})

	socket.on('newLocationMessage', function (message) {
		var li = jQuery('<li></li>')
		var a = jQuery('<a target="_blank">My Current Location</a>')

		li.text(`${message.from}: `);
		a.attr('href', message.url)
		li.append(a);
		jQuery('#messages').append(li);
	})

	// socket.emit('createMessage', {
	// 	from: 'Plue',
	// 	text: 'Gago'
	// }, function(data) {
	// 	console.log(data);
	// })

	jQuery('#message-form').on('submit', function(e) {
		e.preventDefault();

		socket.emit('createMessage', {
			from: 'Plue',
			text: jQuery('[name=message]').val()
		}, function() {
		})
	})

	const locationButton = jQuery('#send-location')

	locationButton.on('click', function() {
		if(!navigator.geolocation) {
			return alert('Geolocation is not supported by your browser')
		}

		navigator.geolocation.getCurrentPosition(function (position) {
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})
		}, function() {
			alert('Unable to fetch location');
		})
	})