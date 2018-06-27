var http = require('http');
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var body='';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        valdata=body.split(" ");    
        if (valdata[1]=='Updated')
          {
            container_name=valdata[0].replace("/home/node/app/json/","").replace("/logs.json",""); 
            socket_message={
              type : "container_update",
              container_name : container_name, 
            };
            io.emit('web', socket_message);
            console.log(socket_message);
          }
    });
    res.write("working");
    res.end();
});

var io = require('socket.io').listen(app);

// // Emit welcome message on connection
// io.on('connection', function(socket) {
//     // Use socket to communicate with this particular client only, sending it it's own id
//     socket.emit('welcome', { message: 'Welcome!', id: socket.id });

//     socket.on('i am client', console.log);
// });

app.listen(3000);