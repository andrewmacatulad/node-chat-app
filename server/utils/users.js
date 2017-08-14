[{
	id: '/454164',
	name: 'PlueboT',
	room: 'Game of Thrones'
}]

class Users {
	constructor () {
		this.users = [];
	}
// addUser(id, name, room)
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
// removeUser(id)
	removeUser (id) {
		// return user that was removed
		var user = this.users.filter((user) => user.id === id)[0]

		if(user) {
			this.users = this.users.filter((user) => {
				return user.id !== id
			})
		}
		return user;
	}
// getUser(id)
	getUser (id) {
		return this.users.filter((user) => user.id === id)[0]
	}
// getUserList(room)
	getUserList (room) {
		var users = this.users.filter((user) => {
			return user.room === room
		})
		var namesArray = users.map((user) => {
			return user.name
		})
		return namesArray;
	}
}

module.exports = {Users};