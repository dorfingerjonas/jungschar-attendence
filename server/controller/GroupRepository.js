const fs = require('fs');
const { promisify } = require('util');

const FILE_PATH = './server/data/groups.json';

class GroupRepository {
    async add(group) {
        const currentFile = await this.getAll();

        group.id = parseInt(group.id);

        if (!group.id || isNaN(group.id)) {
            let id = currentFile.length + 1;

            while (currentFile.filter(g => g.id === id).length > 0) {
                id++;
            }

            group.id = id;
        }

        if (currentFile.filter(g => g.id === group.id).length > 0) {
            return false;
        }

        currentFile.push(group);

        fs.writeFile(FILE_PATH, JSON.stringify(currentFile), err => {
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

        groups[groups.findIndex(r => r.id === group.id)] = group;

        fs.writeFile(FILE_PATH, JSON.stringify(groups), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async delete(id) {
        const currentFile = await this.getAll();

        fs.writeFile(FILE_PATH, JSON.stringify(currentFile.filter(r => r.id !== parseInt(id))), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async getAll() {
        return JSON.parse(await promisify(fs.readFile)(FILE_PATH, 'utf8'));
    }

    async findById(id) {
        const groups = await this.getAll();

        return groups.filter(c => c.id === parseInt(id))[0] ||{};
    }
}

module.exports = GroupRepository;