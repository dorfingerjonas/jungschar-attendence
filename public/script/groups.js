window.addEventListener('load', () => {
    const socket = getSocket();
    const parent = document.getElementById('contentWrapper');

    socket.on('res:group-groups', groups => {
        groups.push({
            name: 'Großveranstaltung',
            location: 'noch nicht bekannt',
            groupId: 0
        });

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

        const buttonWrapper = document.createElement('div');
        const manageBtn = document.createElement('div');
        const createBtn = document.createElement('div');

        manageBtn.textContent = 'Inhalte verwalten';
        createBtn.textContent = 'E-Mail senden';

        manageBtn.addEventListener('click', () => {
            window.location.href = `${window.location.origin}/edit`;
        });
        
        createBtn.addEventListener('click', () => {
            if (confirm('E-Mail wirklich senden?')) {
                console.log('hellp');
                socket.emit('cmd:create-backup', null);
            }
        });

        socket.on('res:create-backup', success => {
            console.log(success);
            if (success) {
                alert('E-Mail erfolgreich versendet');
            } else {
                alert('Senden fehlgeschlagen');
            }
        });

        buttonWrapper.classList.add('buttonWrapper');
        manageBtn.classList.add('button');
        createBtn.classList.add('button');

        buttonWrapper.appendChild(manageBtn);
        buttonWrapper.appendChild(createBtn);
        parent.appendChild(buttonWrapper);
    });
});