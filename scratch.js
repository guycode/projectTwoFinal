var date = new Date();
// first month has array index of 0, so add 1
var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

console.log(today);

// output date in 2019-2-8 format