var foo = require("./foo");
var bar = require("./bar");

function fooBar()
{
  var res= foo + bar;
  console.log("res", res);
}

module.exports = fooBar;
