var expression = /^https?:\/\//;
var regex = new RegExp(expression);
var t = 'https://www.google.com';

if (t.match(regex)) {
  alert("Successful match");
} else {
  alert("No match");
}