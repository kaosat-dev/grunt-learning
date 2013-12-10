var foo = require("./foo");
var bar = require("./bar");
var bla = require("./bla.coffee");

//test for "external/require" browserify stuff
var fakeLib = require("./fakeLib");


function fooBar()
{
  var res= foo + bar + bla;
  console.log("res", res);
  fakeLib(res);
}

module.exports = fooBar;
