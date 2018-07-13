#!/usr/bin/env nodejs
var express  = require('express');
var socketIO = require('socket.io');
var app      = express();                  
var mongoose = require('mongoose');         
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var config = require(__dirname + '/config');
var http = require('http').Server(app);
var dir = __dirname;
var io = socketIO(http);
var cors = require('cors');
// mongoose.connect(config.database, function( err ){
//     if( err ){
//         console.log( err );
//     } else {
//         console.log('Connected to the database.');
//     }
// });

app.use(express.static(__dirname + '/'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
app.use(cors());

var api = require( dir + '/services')(app, express, dir, io);

app.use('/api', api);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

io.on('ping', (data) => {
  console.log('Pinged!');
  console.log(data);
  io.emit('ping', data);
});

setInterval(() => {
  io.emit('ping', 'pinged');
}, 1000);

http.listen(config.port, function( err ){
    if( err ) {
        console.log( err );
    } else {
        console.log("App listening on port " + config.port);
    }
})



