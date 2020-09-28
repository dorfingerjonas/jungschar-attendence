let socket;

function getSocket() {
    if (socket === undefined) {
        socket = io();
    }

    return socket;
}