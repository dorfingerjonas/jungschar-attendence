let socket;

function getSocket() {
    if (socket === undefined) {
        socket = io();
    }

    return socket;
}

function getUrlParams(url) {
    if (url !== undefined && url !== null && url.trim() !== '') {
        const params = [];
        const parts = url.split('?');

        for (let i = 1; i < parts.length; i++) {
            if (parts[i].includes('&')) {
                const subPart = parts[i].split('&');

                for (const part of subPart) {
                    const splitted = part.split('=');
                    params[`${splitted[0]}`] = splitted[1];
                }
            } else {
                const subPart = parts[i].split('=');
                params[`${subPart[0]}`] = subPart[1];
            }
        }

        return params;
    }
}