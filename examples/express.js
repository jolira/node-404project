var express = require("express");
var reporter = require("..");
var myUserID = process.argv[2] || "[Your ISC ID]";
var myKey = process.argv[3] || "[Your Authentication Key]";
var app = module.exports = express.createServer();

app.use(reporter(myUserID, myKey));
app.listen(3e3);