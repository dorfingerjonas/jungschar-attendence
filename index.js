const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const schedule = require('node-schedule');
const fs = require('fs');

const RequestHandler = require('./controller/RequestHandler');
const reqHandler = new RequestHandler();

app.use(express.static('public'));
app.use(express.static('public/font'));
app.use(express.static('public/icons'));
app.use(express.static('public/style'));
app.use(express.static('public/script'));

io.on('connection', socket => {
    socket.on('login data', async data => {
        socket.emit('login validation', await reqHandler.validateCredentials(data));
    });
});

http.listen(3000, () => {
    console.log('http://localhost:3000/');
});
