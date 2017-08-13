const moment = require('moment');
const date = moment();

const generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: date.valueOf()
	}
}

const generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: date.valueOf()
	}
}


module.exports = {generateMessage, generateLocationMessage};