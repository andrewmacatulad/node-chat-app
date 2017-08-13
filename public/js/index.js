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
		var li = jQuery('<li></li>')
		var formattedTime = moment(message.createdAt).format('h:mm a')
		li.text(`${message.from}: ${formattedTime}: ${message.text}`);

		jQuery('#messages').append(li);
	})

	socket.on('newLocationMessage', function (message) {
		var li = jQuery('<li></li>')
		var formattedTime = moment(message.createdAt).format('h:mm a')
		var a = jQuery('<a target="_blank">My Current Location</a>')

		li.text(`${message.from}: ${formattedTime}: `);
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

		var messageTextbox = jQuery('[name=message]')
	
		socket.emit('createMessage', {
			from: 'Plue',
			text: messageTextbox.val()
		}, function() {
			messageTextbox.val('')
		})
	})

	const locationButton = jQuery('#send-location')

	locationButton.on('click', function() {
		if(!navigator.geolocation) {
			return alert('Geolocation is not supported by your browser')
		}

		locationButton.attr('disabled', 'disabled').text('Sending location...')
		navigator.geolocation.getCurrentPosition(function (position) {
			locationButton.removeAttr('disabled').text('Sending location')
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})
		}, function() {
			locationButton.removeAttr('disabled').text('Sending location')
			alert('Unable to fetch location');
		})
	})