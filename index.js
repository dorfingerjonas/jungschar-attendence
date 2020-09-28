const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const schedule = require('node-schedule');
const fs = require('fs');

const RequestHandler = require('./controller/RequestHandler');
const ChildrenRepository = require('./controller/ChildrenRepository');
const TutorRepository = require('./controller/TutorRepository');
const childrenRepo = new ChildrenRepository();
const tutorRepo = new TutorRepository();
const reqHandler = new RequestHandler();

app.use(express.static('public'));
app.use(express.static('public/font'));
app.use(express.static('public/icons'));
app.use(express.static('public/style'));
app.use(express.static('public/scripts'));

io.on('connection', socket => {
    console.log('user connected');
});

http.listen(3000, () => {
    console.log('http://localhost:3000/');
});
