class Person {
	constructor (name, age) {
		this.name = name
		this.age = age
	}
	getUserDescription () {
		return `${this.name} is ${this.age} years old.`
	}

}

var me = new Person('WAAA', 40);
console.log(me.name, + ' ' + me.age)
var desciption = me.getUserDescription();
console.log(desciption)
