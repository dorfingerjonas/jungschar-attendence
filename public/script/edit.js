window.addEventListener('load', () => {
    const socket = getSocket();
    const parent = document.getElementById('contentWrapper');
    let globalGroups = [];

    socket.emit('req:tutors', 'manage');
    socket.emit('req:groups', 'manage');

    socket.on('cmd:reload', () => {
        location.reload();
    });

    socket.on('res:manage-tutors', tutors => {
        const tutorsWrapper = document.createElement('div');
        const headline = document.createElement('h2');

        headline.textContent = 'LeiterInnen';

        tutorsWrapper.appendChild(headline);

        tutors = tutors.sort((c1, c2) => c1.name.localeCompare(c2.name));

        for (const tutor of tutors) {
            const newTutor = document.createElement('div');
            const name = document.createElement('input');
            const saveBtn = document.createElement('div');
            const deleteBtn = document.createElement('div');

            name.type = 'text';
            name.placeholder = 'Name';
            name.value = tutor.name;

            saveBtn.textContent = 'Speichern';
            deleteBtn.textContent = 'Löschen';

            saveBtn.addEventListener('click', () => {
                if (name.value.trim() !== '') {
                    name.classList.remove('errorInput');

                    tutor.name = name.value;

                    socket.emit('data:update-tutor', tutor);
                } else {
                    name.classList.add('errorInput');
                }
            });

            deleteBtn.addEventListener('click', () => {
                if (confirm('wirklich löschen?')) {
                    socket.emit('data:delete-tutor', tutor);
                    tutorsWrapper.removeChild(newTutor);
                }
            });

            newTutor.classList.add('manage-tutor');
            saveBtn.classList.add('manage-button');
            deleteBtn.classList.add('manage-button');

            newTutor.appendChild(name);
            newTutor.appendChild(saveBtn);
            newTutor.appendChild(deleteBtn);
            tutorsWrapper.appendChild(newTutor);
        }

        tutorsWrapper.classList.add('tutorManagerWrapper');
        headline.classList.add('headline');

        const newTutor = document.createElement('div');
        const name = document.createElement('input');
        const createBtn = document.createElement('div');

        name.type = 'text';
        name.placeholder = 'Name';

        createBtn.textContent = 'Erstellen';

        createBtn.addEventListener('click', () => {
            if (name.value.trim() !== '') {
                socket.emit('data:add-tutor', {name: name.value});
            }
        });

        newTutor.classList.add('manage-tutor');
        createBtn.classList.add('manage-button');

        newTutor.appendChild(name);
        newTutor.appendChild(createBtn);
        tutorsWrapper.appendChild(newTutor);
        parent.appendChild(tutorsWrapper);
    });

    socket.on('res:manage-groups', groups => {
        const groupsWrapper = document.createElement('div');
        const headline = document.createElement('h2');

        globalGroups = groups;

        headline.textContent = 'Gruppen';

        groupsWrapper.appendChild(headline);
        socket.emit('req:children', 'manage');

        groups = groups.sort((c1, c2) => c1.name.localeCompare(c2.name));

        for (const group of groups) {
            const newGroup = document.createElement('div');
            const name = document.createElement('input');
            const location = document.createElement('input');
            const saveBtn = document.createElement('div');
            const deleteBtn = document.createElement('div');

            name.type = 'text';
            name.placeholder = 'Name';
            name.value = group.name;
            
            location.type = 'text';
            location.placeholder = 'Raum';
            location.value = group.location;

            saveBtn.textContent = 'Speichern';
            deleteBtn.textContent = 'Löschen';

            saveBtn.addEventListener('click', () => {
                if (name.value.trim() === '') {
                    name.classList.add('errorInput');
                } else if (location.value.trim() === '') {
                    location.classList.remove('errorInput');
                } else {
                    location.classList.remove('errorInput');

                    group.name = name.value;
                    group.location = location.value;

                    socket.emit('data:update-group', group);
                }
            });

            deleteBtn.addEventListener('click', () => {
                const options = document.getElementsByTagName('option');
                let isUsed = false;

                if (confirm('wirklich löschen?')) {
                    for (const option of options) {
                        if (option.selected && parseInt(option.value) === group.groupId) {
                            isUsed = true;
                        }
                    }

                    if (isUsed) {
                        alert('Gruppe kann nicht gelöscht werden, es sind noch Kinder in dieser Gruppe')
                    } else {
                        socket.emit('data:delete-group', group);
                        groupsWrapper.removeChild(newGroup);   
                    }
                }
            });

            newGroup.classList.add('manage-group');
            saveBtn.classList.add('manage-button');
            deleteBtn.classList.add('manage-button');

            newGroup.appendChild(name);
            newGroup.appendChild(saveBtn);
            newGroup.appendChild(deleteBtn);
            groupsWrapper.appendChild(newGroup);
        }

        const newGroup = document.createElement('div');
        const name = document.createElement('input');
        const location = document.createElement('input');
        const createBtn = document.createElement('div');

        name.type = 'text';
        name.placeholder = 'Name';
        
        location.type = 'text';
        location.placeholder = 'Raum';

        createBtn.textContent = 'Erstellen';

        createBtn.addEventListener('click', () => {
            if (name.value.trim() !== '' && location.value.trim() !== '') {
                socket.emit('data:add-group', {name: name.value, location: location.value});
            }
        });

        newGroup.classList.add('manage-group');
        createBtn.classList.add('manage-button');
        groupsWrapper.classList.add('groupsManagerWrapper');
        headline.classList.add('headline');

        newGroup.appendChild(name);
        newGroup.appendChild(location);
        newGroup.appendChild(createBtn);
        groupsWrapper.appendChild(newGroup);
        parent.appendChild(groupsWrapper);
    });
    
    socket.on('res:manage-children', children => {
        const childrenWrapper = document.createElement('div');
        const headline = document.createElement('h2');

        headline.textContent = 'Kinder';

        childrenWrapper.appendChild(headline);

        children = children.sort((c1, c2) => c1.name.localeCompare(c2.name));

        for (const child of children) {
            const newChild = document.createElement('div');
            const name = document.createElement('input');
            const saveBtn = document.createElement('div');
            const deleteBtn = document.createElement('div');
            const groupSelection = document.createElement('select');

            name.type = 'text';
            name.placeholder = 'Name';
            name.value = child.name;

            saveBtn.textContent = 'Speichern';
            deleteBtn.textContent = 'Löschen';

            for (const group of globalGroups) {  
                const option = document.createElement('option');
                option.value = group.groupId;
                option.textContent = group.name;

                if (group.groupId === child.groupId) {
                    option.selected = true;
                } else {
                    option.selected = false;
                }

                groupSelection.appendChild(option);
            }

            saveBtn.addEventListener('click', () => {
                if (name.value.trim() !== '') {
                    name.classList.remove('errorInput');

                    child.name = name.value;
                    child.groupId = parseInt(groupSelection.selectedOptions[0].value);

                    socket.emit('data:update-child', child);
                } else {
                    name.classList.add('errorInput');
                }
            });

            deleteBtn.addEventListener('click', () => {
                if (confirm('wirklich löschen?')) {
                    socket.emit('data:delete-child', child);
                    childrenWrapper.removeChild(newChild);
                }
            });

            newChild.classList.add('manage-child');
            saveBtn.classList.add('manage-button');
            deleteBtn.classList.add('manage-button');

            newChild.appendChild(name);
            newChild.appendChild(groupSelection);
            newChild.appendChild(saveBtn);
            newChild.appendChild(deleteBtn);
            childrenWrapper.appendChild(newChild);
        }

        const newChild = document.createElement('div');
        const name = document.createElement('input');
        const createBtn = document.createElement('div');
        const groupSelection = document.createElement('select');

        name.type = 'text';
        name.placeholder = 'Name';
        createBtn.textContent = 'Erstellen';

        for (const group of globalGroups) {  
            const option = document.createElement('option');
            option.value = group.groupId;
            option.textContent = group.name;

            groupSelection.appendChild(option);
        }

        createBtn.addEventListener('click', () => {
            if (name.value.trim() !== '') {
                const child = {
                    name: name.value,
                    groupId: parseInt(groupSelection.selectedOptions[0].value)
                };
        
                socket.emit('data:add-child', child);
            }
        });

        headline.classList.add('headline');
        newChild.classList.add('manage-child');
        createBtn.classList.add('manage-button');
        childrenWrapper.classList.add('childrenManagerWrapper');

        newChild.appendChild(name);
        newChild.appendChild(groupSelection);
        newChild.appendChild(createBtn);
        childrenWrapper.appendChild(newChild);

        parent.appendChild(childrenWrapper);
    });
});