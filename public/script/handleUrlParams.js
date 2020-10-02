window.addEventListener('load', () => {
    const socket = getSocket();
    const params = getUrlParams(window.location.href);

    socket.on('cmd:reload', () => {
        location.reload();
    });

    if (params['groupId'] !== undefined) {
        socket.emit('req:tutors', 'lesson');
        socket.emit('req:childrenByGroupId', params['groupId']);
        socket.emit('req:lessonByGroupId', params['groupId']);
    } else {
        socket.emit('req:groups', 'group');
    }
});