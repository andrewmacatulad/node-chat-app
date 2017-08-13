const moment = require('moment');


var date = moment();
date.add(100, 'year').subtract(9, 'months');

console.log(date.format('MMM Do, YYYY'))

console.log(date.format('h:mm a'));


var moment = require('moment');
// Apr 13, 2017 @ 11:20 am
console.log(moment().format('MMM DD, YYYY @ H:mm a'));

// January 1st 1970 @ 12:00am -> 0
// January 1st 1970 @ 12:01am -> -60

var now = moment();

// Unix timestampt it starts with January 1st 1970 @ 12:00am
// it is presented independent of your timezone
console.log('Current Timestamp', now.unix());
// this is the timestamp you got
var timestamp = 1492053040;
// this will change/format the timestamp
var currentMoment = moment.unix(timestamp);

// this will format the timestampt to this
// April 13th, 2017 @ 11:10 AM
console.log(currentMoment.format('MMMM Do, YYYY @ H:mm A'))

// this is for milliseconds
var someTimestamp = moment().valueOf();
console.log(someTimestamp)