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
var express = require('express');

// the user id is usually a number, like 1234567
var myUserID='[Your ISC ID]';
var myKey='[Your Authentication Key]';
var reporter = require('404project').create(myUserID, myKey);
var app = module.exports = express.createServer();

app.get(function(request, response) {
    response.statusCode = 404;
    response.end("<h1>not found</h1>");
    reporter.report404(request);
});

app.listen(3000);
```
