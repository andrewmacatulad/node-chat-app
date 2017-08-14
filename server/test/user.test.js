const expect = require('expect')

const {Users} = require('../utils/users');
let users;

beforeEach(() => {
	users = new Users();
	users.users = [{
		id: '1',
		name: 'TobeulP',
		room: 'Breaking Bad'
	}, {
		id: '2',
		name: 'Bot',
		room: 'Better Call Saul'
	}, {
		id: '3',
		name: 'Plue',
		room: 'Breaking Bad'
	}]
})


describe('Users', () => {
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'PlueboT',
			room: 'Game of Thrones'
		};
		var resUser = users.addUser(user.id, user.name, user.room)

		expect(users.users).toEqual([user])
	})
	
	it('should remove a user', () => {
		var userId = '2';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	})
	it('should not remove a user', () => {
		var userId = '4';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	})


	it('should find a user', () => {
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe(userId)
	})
	it('should not find a user', () => {
		var userId = '4';
		var user = users.getUser(userId);

		expect(user).toNotExist()
	})


	it('should return names for BreakingBad', () => {
		var userList = users.getUserList('Breaking Bad');

		expect(userList).toEqual(['TobeulP', 'Plue']);
	})
	it('should return names for Better Call Saul', () => {
		var userList = users.getUserList('Better Call Saul');

		expect(userList).toEqual(['Bot']);
	})
})