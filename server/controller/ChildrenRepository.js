const fs = require('fs');
const { promisify } = require('util');

class ChildrenRepository {
    async add(child) {
        const currentFile = await this.getAll();

        if (!child.id) {
            child.id = Date.now();
        }

        currentFile.push(child);

        fs.writeFile('./data/children.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async update(child) {
        const children = await this.getAll();

        children[children.findIndex(r => r.childId === child.childId)] = child;

        fs.writeFile('./data/children.json', JSON.stringify(children), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async delete(child) {
        const currentFile = await this.getAll();

        fs.writeFile('./data/children.json', JSON.stringify(currentFile.filter(r => r.childId !== child.childId)), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/children.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        return JSON.parse(await promisify(fs.readFile)('./data/children.json', 'utf8'));
    }

    async findById(id) {
        const children = await this.getAll();

        return children.filter(c => c.id === parseInt(id));
    }
}

module.exports = ChildrenRepository;