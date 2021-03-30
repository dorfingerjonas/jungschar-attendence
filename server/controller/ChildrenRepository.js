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

        children[children.findIndex(r => r.id === child.id)] = child;

        fs.writeFile('./data/children.json', JSON.stringify(children), err => {
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

        console.log(id);

        fs.writeFile('./data/children.json', JSON.stringify(currentFile.filter(r => r.id !== parseInt(id))), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
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