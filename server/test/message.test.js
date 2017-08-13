const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('../utils/message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		// store res in variable
		const from = 'Plue';
		const text = 'some message';
		const message = generateMessage(from, text);

		// assert from match
		expect(message).toInclude({from, text})
		// assert text match

		// assert createAt is number
		expect(message.createdAt).toBeA('number')
	})
})

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = "Tob";
		const latitude = '13';
		const longitude = '2';
		const url = 'https://www.google.com/maps?q=13,2';
		const locationMessage = generateLocationMessage(from, latitude, longitude);

		expect(locationMessage.createdAt).toBeA('number')
		expect(locationMessage)
		expect(locationMessage).toInclude({from, url})
	})
})