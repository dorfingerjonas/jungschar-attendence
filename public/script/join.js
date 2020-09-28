window.addEventListener('load', () => {
    const socket = getSocket();
    const logInBtn = document.getElementById('logInBtn');

    socket.on('login validation', isValid => {
        const feedback = document.getElementById('passwordFDB');

        if (isValid) {
            feedback.textContent = '';
            username.classList.remove('errorInput');
            password.classList.remove('errorInput');
        } else {
            feedback.textContent = 'Benutzername oder Passwort falsch';
            username.classList.add('errorInput');
            password.classList.add('errorInput');
        }
    });

    window.addEventListener('keydown', eve => {
        if (eve.key === 'Enter') {
            logInBtn.click();
        }
    });

    logInBtn.addEventListener('click', () => {
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const usernameFDB = document.getElementById('usernameFDB');
        const passwordFDB = document.getElementById('passwordFDB');
        let isValid = true;

        if (username.value.trim() === '') {
            isValid = false;
            usernameFDB.textContent = 'Benutzername leer';
            username.classList.add('errorInput');
        } else {
            usernameFDB.textContent = '';
            username.classList.remove('errorInput');
        }

        if (password.value.trim() === '') {
            isValid = false;
            passwordFDB.textContent = 'Passwort leer';
            password.classList.add('errorInput');
        } else {
            password.classList.remove('errorInput');
        }

        if (isValid) {
            username.blur();
            password.blur();

            socket.emit('login data', {username: username.value, password: password.value});
        }
    });
});
