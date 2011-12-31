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

var https = require('https');

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

  return hour + "-" + minute + "-" + second;
}

function Reporter(userID, key) {
  this.userID = userID;
  this.key = key;
}

Reporter.prototype.report404 = function() {
  var url;
  var ip;
  var ua;
  var ts;

  if (arguments.length == 1) {
    url = request.url;
    ip = request.connection.remoteAddress;
    ua = request.headers['user-agent'];
    ts = new Date();
  }
  else {
    url = arguments[0];
    ip = arguments[1];
    ua = arguments[2];
    ts = arguments[3] || new Date();
  }

  var req = https.request({
    host: 'isc.sans.edu',
    port: 443,
    path: '/weblogs/404project.html?version=2&id=' + this.userID,
    method: 'POST'
  }, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  var data = this.userID + '\0' + this.key + '\0' + url + '\0' + ip + '\0' + ua + '\0' + formatYmd(ts) + '\0' + formatHms(ts);
  var buf = new Buffer(data);
  var payload = buf.toString('base64');

  console.log("data=%s", data);
  console.log("paylaod=%s", payload);

  req.write('DATA=');
  req.write(payload);
  req.end();
};

module.exports.create = function(userID, key) {
    return new Reporter(userID, key);
};
