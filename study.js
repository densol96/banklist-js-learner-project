// Creating Timer

let sessionLength = 1 * 60;

// const startLogOutTimes = function() {

// }
let mins = Math.floor(sessionLength / 60);
let secs = sessionLength % 60;
const timedId = setInterval(function () {
    sessionLength--;
    mins = `${Math.floor(sessionLength / 60)}`.padStart(2, `0`);
    secs = `${sessionLength % 60}`.padStart(2, `0`);
    console.log(mins, secs);
    if (mins === 0 && secs === 0) {
        clearTimeout(timedId);
    }
}, 1000)
console.log(mins, secs);