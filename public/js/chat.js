var socket = io();

function scrollToBottom () {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child')
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();


  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}


	socket.on('connect', () => {
		var params = jQuery.deparam(window.location.search);

		socket.emit('join', params, (err) => {
			if(err) {
				window.location.href ='/';
			} else {
				console.log('No Error');
			}
		})
	})

	socket.on('updateUserList', (users) => {
		var ol = jQuery('<ol></ol>');
		users.forEach((user) => {
			ol.append(jQuery('<li></li>').text(user));
		});

		jQuery('#users').html(ol);
	})

	socket.on('disconnect', () => {
		console.log('Disconnected from the server')
	})


	socket.on('newMessage', (message) => {
		var formattedTime = moment(message.createdAt).format('h:mm a')
		var template = jQuery('#message-template').html();

		var html = Mustache.render(template, {
			text: message.text,
			from: message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
		scrollToBottom();

	})

	socket.on('newLocationMessage', function (message) {
		
		var formattedTime = moment(message.createdAt).format('h:mm a')
		var template = jQuery('#location-message-template').html();

		var html = Mustache.render(template, {
			url: message.url,
			from: message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
		scrollToBottom();

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