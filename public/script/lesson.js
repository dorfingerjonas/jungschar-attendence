window.addEventListener('load', () => {
    const socket = getSocket();
    const parent = document.getElementById('contentWrapper');

    socket.on('res:childrenByGroupId', children => {
        const childrenWrapper = document.createElement('div');

        children = children.sort((c1, c2) => c1.name.localeCompare(c2.name));

        const headline = document.createElement('h2');
        headline.textContent = 'Kinder';

        parent.appendChild(headline);
        
        for (const child of children) {
            const newChild = document.createElement('div');

            const name = document.createElement('p');
            name.textContent = child.name;

            newChild.id = child.childId;

            newChild.addEventListener('click', () => {
                newChild.classList.toggle('absent');
            });

            childrenWrapper.classList.add('childrenWrapper');
            newChild.classList.add('child');
            newChild.classList.add('absent');

            newChild.appendChild(name);
            childrenWrapper.appendChild(newChild);
            parent.appendChild(childrenWrapper);
        }

        printSaveButton();
    });

    socket.on('res:lesson-tutors', tutors => {
        const tutorWrapper = document.createElement('div');

        tutors = tutors.sort((t1, t2) => t1.name.localeCompare(t2.name));

        const headline = document.createElement('h2');
        headline.textContent = 'LeiterInnen';

        parent.appendChild(headline);

        for (const tutor of tutors) {
            const newTutor = document.createElement('div');

            const name = document.createElement('p');
            name.textContent = tutor.name

            newTutor.id = tutor.tutorId;

            newTutor.addEventListener('click', () => {
                newTutor.classList.toggle('absent');
            });

            tutorWrapper.classList.add('tutorWrapper');
            newTutor.classList.add('tutor');
            newTutor.classList.add('absent');

            newTutor.appendChild(name);
            tutorWrapper.appendChild(newTutor);
            parent.appendChild(tutorWrapper);
        }
    });

    socket.on('res:lessonByGroupId', lesson => {
        if (lesson[0] === undefined) {
            lesson[0] = {
                children: [],
                tutors: []
            }
        }

        const children = lesson[0].children;
        const tutors = lesson[0].tutors;

        for (const child of children) {
            const divs = document.getElementsByClassName('child');

            for (const div of divs) {
                if (parseInt(div.id) === parseInt(child)) {
                    div.classList.remove('absent');
                }
            }
        }

        for (const tutor of tutors) {
            const divs = document.getElementsByClassName('tutor');

            for (const div of divs) {
                if (parseInt(div.id) === parseInt(tutor)) {
                    div.classList.remove('absent');
                }
            }
        }
    });

    function printSaveButton() {
        const button = document.createElement('div');
        const span = document.createElement('span');

        span.textContent = 'Speichern';

        button.addEventListener('click', () => {
            const localtime = new Date();
            const date = `${localtime.getFullYear()}-${('0' + (localtime.getMonth() + 1)).slice(-2)}-${('0' + localtime.getDate()).slice(-2)}`;
            const children = [];
            const tutors = [];

            for (const child of document.querySelectorAll('.childrenWrapper .child')) {
                if (!child.className.includes('absent')) {
                    children.push(parseInt(child.id));
                }
            }

            for (const tutor of document.querySelectorAll('.tutorWrapper .tutor')) {
                if (!tutor.className.includes('absent')) {
                    tutors.push(parseInt(tutor.id));
                }
            }

            const lesson = {
                date,
                groupId: parseInt(getUrlParams(window.location.href)['groupId']),
                children,
                tutors
            }

            socket.emit('data:lesson', lesson);
        });

        button.classList.add('saveBtn');

        button.appendChild(span);
        parent.appendChild(button);
    }
});