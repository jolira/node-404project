node-404project
=====================

A simple client for reporting 404 server errors to the "404 project" at http://www.dshield.org/tools/404project.html.

Installation
---------------------

```
npm install 404project
```

Usage
---------------------

```
var express = require("express");
var reporter = require("404project");
var myUserID = process.argv[2] || "[Your ISC ID]";
var myKey = process.argv[3] || "[Your Authentication Key]";
var app = module.exports = express.createServer();

app.use(reporter(myUserID, myKey));
app.listen(3000);
```

There is also a command-line tool:

```
bin/404reporter 036742670 aaaaaaaaaaaabbcccccccccccceeeeeeeeffffff "http://www.jolira.com/__phpamdin" 125.64.23.180 jakarta
```