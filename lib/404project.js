/*
 * SANS ISC 404Project v1
 *
 * http://isc.sans.edu/tools/404project.html
 *
 * Purpose: Collect 404 Page Not Found to compile
 *          list for potential crawler trends
 *
 * Instructions: Enter the following from https://isc.sans.edu/myinfo.html
 *                for the variables below
 *     $sMyUserID - in right-column under "Logged in as:"
 *     $sMyKey - in section https://isc.sans.edu/myinfo.html#report
 *               labeled "Your Authentication Key:"
 */
/*jshint  devel:true, node:true, indent:2, maxerr:50 */
(function() {
  "use strict";
  var debug;
  if (process.env.NODE_DEBUG && /404project/.test(process.env.NODE_DEBUG)) {
    debug = function(x) { console.error('404project: %s', x); };
  } else {
    debug = function() { };
  }
  var https = require("https");
  function formatYmd(ts) {
    var year = ts.getUTCFullYear();
    var month = ts.getUTCMonth() + 1;
    var day = ts.getUTCDate();
    return year + "-" + month + "-" + day;
  }
  function formatHms(ts) {
    var hour = ts.getUTCHours();
    var minute = ts.getUTCMinutes() + 1;
    var second = ts.getUTCSeconds();
    return hour + ":" + minute + ":" + second;
  }
  function submit(userID, key, url, ip, ua, ts) {
    var req = https.request({
      host: "isc.sans.edu",
      port: 443,
      path: "/weblogs/404project.html?id=" + userID + "&version=2",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }, function(res) {
      res.setEncoding("utf8");
      res.on("data", function(chunk) {
        debug(chunk);
      });
    });
    var data = userID + "\0" + key + "\0" + url + "\0" + ip + "\0" + ua + "\0" + formatYmd(ts) + "\0" + formatHms(ts);
    var buf = new Buffer(data);
    var payload = buf.toString("base64");
    req.write("DATA=" + payload);
    req.end();
  }
  module.exports = function(userID, key) {
    return function() {
      if (!arguments[0].url) {
        return submit(userID, key, arguments[0], arguments[1], arguments[2], arguments[3] || new Date);
      }
      var request = arguments[0];
      var response = arguments[1];
      if (!response) {
        return submit(userID, key, request.url, request.connection.remoteAddress, request.headers["user-agent"], new Date);
      }
      var next = arguments[2];
      var end = response.end;
      response.end = function(chunk, encoding) {
        response.end = end;
        response.end(chunk, encoding);
        if (response.statusCode === 404) {
          submit(userID, key, request.url, request.connection.remoteAddress, request.headers["user-agent"], new Date);
        }
      };
      return next && next();
    };
  };
})();