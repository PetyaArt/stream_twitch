const http = require('http');
const url = require('url');
var twitchStreams = require('../');

const server = http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var qdata = q.query;
    res.writeHead(200, {'Content-Type': 'application/json'})
    var key = 'stream'
    var obj = {};
    obj[key] = []
    var nick = qdata.nickname
    twitchStreams.get(nick)
        .then(function (streams) {
            for (var stream of streams) {
                var data = {
                    quality: stream.quality,
                    resolution: stream.resolution,
                    url: stream.url
                }
                obj[key].push(data)
            }
            res.end(JSON.stringify(obj));
        })
        .catch(function (error) {
            if (error)
                return console.log('Error caught:', error);
        });
});

server.listen(4001, '127.0.0.4');
console.log('port: 4001');
