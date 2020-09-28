const fs = require('fs');
const { promisify } = require('util');
const passwordHash = require('password-hash');

class UserRepository {
    async add(user) {
        const currentFile = await getAll();

        const duplicatedUser = currentFile.filter(r => r.username === user.username);

        if (duplicatedUser.length !== 0) {
            return false;
        }

        user.id = Date.now();
        user.password = passwordHash.generate(user.password);

        currentFile.push(user);

        fs.writeFile('./data/user.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(user) {
        const currentFile = await getAll();

        fs.writeFile('./data/user.json', JSON.stringify(currentFile.filter(r => r.id !== user.id)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/user.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async validateCredentials(credentials) {
        const currentFile = await getAll();
        const user = currentFile.filter(r => r.username === credentials.username);

        if (user[0] !== undefined) {
            return passwordHash.verify(credentials.password, user[0].password);
        } else {
            return false;
        }
    }
}

async function getAll() {
    return JSON.parse(await promisify(fs.readFile)('./data/user.json', 'utf8'));
}

module.exports = UserRepository;
