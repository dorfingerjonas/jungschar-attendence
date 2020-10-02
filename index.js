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
    socket.on('req:groups', async prefix => {
        socket.emit(`res:${prefix}-groups`, await reqHandler.getGroups());
    });

    socket.on('req:childrenByGroupId', async groupId => {
        socket.emit('res:childrenByGroupId', await reqHandler.getChildrenByGroupId(groupId));
    });

    socket.on('req:tutors', async prefix => {
        socket.emit(`res:${prefix}-tutors`, await reqHandler.getTutors());
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

    socket.on('req:children', async prefix => {
        socket.emit(`res:${prefix}-children`, await reqHandler.getChildren());
    });

    socket.on('data:update-child', async child => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.updateChild(child);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:update-tutor', async tutor => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.updateTutor(tutor);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:update-group', async group => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.updateGroup(group);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:add-child', async child => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.addChild(child);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:add-tutor', async tutor => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.addTutor(tutor);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:add-group', async group => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.addGroup(group);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:delete-child', async child => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.deleteChild(child);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });
    
    socket.on('data:delete-tutor', async tutor => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.deleteTutor(tutor);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });

    socket.on('data:delete-group', async group => {
        let interval = setInterval(async () => {
            if (!isLocked) {
                isLocked = true;
                await reqHandler.deleteGroup(group);
                isLocked = false;
                clearInterval(interval);
                io.emit('cmd:reload', null);
            }
        }, 10);
    });
});

schedule.scheduleJob('0 0 18 * * 5', async () => {
    reqHandler.createBackup();
});

http.listen(3000, () => {
    console.log('http://localhost:3000/');
});