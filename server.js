const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const port = 6676


const include_files = [
    '/anim.js',
    '/control.js',
    '/node_modules/three/build/three.min.js',
    '/node_modules/nouislider/distribute/nouislider.min.js',
    '/node_modules/nouislider/distribute/nouislider.min.css',
];

const app = express();
const server = http.Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/ctl', function(req, res) {
    res.sendFile(__dirname + '/control.html');
});

let settings = {};
app.get('/settings', function(req, res) {
    res.send(settings);
});

include_files.map(function(file) {
    app.get(file, function(req, res){
        res.sendFile(__dirname + file);
    });
});

server.listen(port, () => console.log('listening on *:' + port))

// Websocket init
const wss = new WebSocket.Server({ server })

wss.on('connection', function (ws) {

  console.log('kontekt')

  ws.on('message', (msg) => {
    //console.log('got msg', msg)
    const parts = msg.split(":")
    const cmd = parts[0]

    // Broadcast adjust msg
    switch (cmd) {
    case 'adjust':
      wss.clients.forEach( client => {
        if (client != ws) {
          client.send(msg)
        }
      })
    }
  })
})
