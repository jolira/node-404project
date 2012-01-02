node-404project
=====================

A simple client for reporting 404 server errors to the "404 project" at http://www.dshield.org/tools/404project.html.

Please see the instructions at http://www.dshield.org/tools/404project.html for creating an ISC account retrieving
the ISC ID and the Authentication key.

Installation
---------------------

```
npm install 404project
```

Usage
---------------------

### Express.js

Using as a plugin for express.js:

```
var express = require("express");
var reporter = require("404project");
var myUserID = process.argv[2] || "[Your ISC ID]";
var myKey = process.argv[3] || "[Your Authentication Key]";
var app = express.createServer();

app.use(reporter(myUserID, myKey));
app.listen(3000);
```

### Connect.js

The same code also works for connect.js. Just replace

```
var express = require("express");
```

with

```
var express = require("connect");
```

### Other Frameworks

Users of different frameworks can call the functionreturned by ``reporter(myUserID, myKey)`` directly using:

```
// ...
var report = reporter(myUserID, myKey);

report(request, response);
// ...
```

or

```
// ...
var report = reporter(myUserID, myKey);

report(url, ip, ua, timestamp);
// ...
```

### Command-Line Support

There is also a command-line tool:

```
bin/404reporter 036742670 aaaaaaaaaaaabbcccccccccccceeeeeeeeffffff "http://www.jolira.com/__phpamdin" 125.64.23.180 jakarta
```

Debugging
---------------------

In case of error, dshield does not provide a terrific amount of debugging support, but an message is produced
if the value ``404project`` is part of the ``NODE_DEBUG`` environment variable.

```
export NODE_DEBUG="404project"
```

The library prints ``404project: OK`` if the data was submitted correctly and ``404project: ERROR`` if it did not.
Please double-check you ISC ID and the Authentication key in case you encounter problems.
