const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const schedule = require('node-schedule');

const RequestHandler = require('./controller/RequestHandler');
const reqHandler = new RequestHandler();

app.use(express.static('public'));
app.use(express.static('public/edit'));
app.use(express.static('public/font'));
app.use(express.static('public/icons'));
app.use(express.static('public/style'));
app.use(express.static('public/script'));
app.use(express.static('public/icons'));

let isLocked = false;

io.on('connection', socket => {
    socket.on('req:groups', async () => {
        socket.emit('res:groups', await reqHandler.getGroups());
    });

    socket.on('req:children', async groupId => {
        socket.emit('res:children', await reqHandler.getChildrenByGroupId(groupId));
    });

    socket.on('req:tutors', async () => {
        socket.emit('res:tutors', await reqHandler.getTutors());
    });

    socket.on('data:lesson', lesson => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.saveLesson(lesson);
                isLocked = false;
                clearInterval(interval);
            }
        }, 10);
    });

    socket.on('req:lessonByGroupId', async groupId => {
        socket.emit('res:lessonByGroupId', await reqHandler.getLessonByGroupId(groupId));
    });
});

schedule.scheduleJob('0 0 18 * * 5', async () => {
    reqHandler.createBackup();
});

http.listen(3000, () => {
    console.log('http://localhost:3000/');
});