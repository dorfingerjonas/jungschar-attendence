const fs = require('fs');
const { promisify } = require('util');

class ChildrenRepository {
    async add(child) {
        const currentFile = await this.getAll();

        child.childId = Date.now();

        currentFile.push(child);

        fs.writeFile('./data/children.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(child) {
        const children = await this.getAll();

        children[children.findIndex(r => r.childId === child.childId)] = child;

        fs.writeFile('./data/children.json', JSON.stringify(children), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(child) {
        const currentFile = await this.getAll();

        fs.writeFile('./data/children.json', JSON.stringify(currentFile.filter(r => r.childId !== child.childId)), err => {
            if (err) {
                console.error(err);
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

    async getChildrenByGroupId(groupId) {
        const children = await this.getAll();

        return children.filter(r => r.groupId === parseInt(groupId));
    }
}

module.exports = ChildrenRepository;
