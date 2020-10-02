const fs = require('fs');
const { promisify } = require('util');

class GroupsRepository {
    async add(group) {
        const currentFile = await this.getAll();

        group.groupId = Date.now();

        currentFile.push(group);

        fs.writeFile('./data/groups.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async update(group) {
        const groups = await this.getAll();

        groups[groups.findIndex(r => r.groupId === group.groupId)] = group;

        fs.writeFile('./data/groups.json', JSON.stringify(groups), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async delete(group) {
        const currentFile = await this.getAll();

        fs.writeFile('./data/groups.json', JSON.stringify(currentFile.filter(r => r.groupId !== group.groupId)), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/groups.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        return JSON.parse(await promisify(fs.readFile)('./data/groups.json', 'utf8'));
    }
}

module.exports = GroupsRepository;
