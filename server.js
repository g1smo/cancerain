const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 6676;

const include_files = [
    '/anim.js',
    '/control.js',
    '/node_modules/three/build/three.min.js',
    '/node_modules/nouislider/distribute/nouislider.min.js',
    '/node_modules/nouislider/distribute/nouislider.min.css',
    '/node_modules/socket.io-client/dist/socket.io.js'
];

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

io.on('connection', function(socket){
    console.log('konekt');

    socket.on('disconnect', function(){
        console.log('diskonekt');
    });

    socket.on('adjust', function(name, val) {
        settings[name] = val;
        io.emit('adjust', name, val, socket.id);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
