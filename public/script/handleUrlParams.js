window.addEventListener('load', () => {
    const params = getUrlParams(window.location.href);

    if (params['groupId'] !== undefined) {
        socket.emit('req:tutors', null);
        socket.emit('req:children', params['groupId']);
        socket.emit('req:lessonByGroupId', params['groupId']);
    } else {
        socket.emit('req:groups', null);
    }
});