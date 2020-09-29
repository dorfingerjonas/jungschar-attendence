window.addEventListener('load', () => {
    const socket = getSocket();
    const parent = document.getElementById('contentWrapper');

    socket.on('res:groups', groups => {
        for (const group of groups) {
            const newGroup = document.createElement('div');
            const name = document.createElement('div');
            const location = document.createElement('div');
            const nameText = document.createElement('p');
            const locationText = document.createElement('p');
            const nameImg = document.createElement('img');
            const locationImg = document.createElement('img');

            nameText.textContent = group.name;
            locationText.textContent = group.location;

            nameImg.src = '/icons/user.svg';
            locationImg.src = '/icons/map-marker.svg';

            newGroup.addEventListener('click', () => {
                window.location.href = `${window.location.origin}?groupId=${group.groupId}`;
            });

            newGroup.classList.add('group');
            name.classList.add('groupRow');
            location.classList.add('groupRow');

            name.appendChild(nameImg);
            name.appendChild(nameText);
            location.appendChild(locationImg);
            location.appendChild(locationText);

            newGroup.appendChild(name);
            newGroup.appendChild(location);
            parent.appendChild(newGroup);
        }
    });
});