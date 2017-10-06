var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/ctl', function(req, res){
    res.sendFile(__dirname + '/control.html');
});

app.get('/three.min.js', function(req, res){
    res.sendFile(__dirname + '/three.min.js');
});

app.get('/anim.js', function(req, res){
    res.sendfile(__dirname + '/anim.js');
});

app.get('/control.js', function(req, res){
    res.sendfile(__dirname + '/control.js');
});

app.get('/socket.io.js', function(req, res){
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

io.on('connection', function(socket){
    console.log('konekt');

    socket.on('disconnect', function(){
        console.log('diskonekt');
    });

    socket.on('adjust', function(name, val) {
        io.emit('adjust', name, val);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
