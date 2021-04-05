const fs = require('fs');
const { promisify } = require('util');

const FILE_PATH = './data/children.json';

class ChildrenRepository {
    async add(child) {
        const currentFile = await this.getAll();

        child.id = parseInt(child.id);

        if (!child.id || isNaN(child.id)) {
            child.id = Date.now();
        }

        if (currentFile.filter(c => c.id === child.id).length > 0) {
            return false;
        }

        currentFile.push(child);

        fs.writeFile(FILE_PATH, JSON.stringify(currentFile), err => {
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

        fs.writeFile(FILE_PATH, JSON.stringify(children), err => {
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
        const children = await this.getAll();

        return children.filter(c => c.id === parseInt(id))[0] ||{};
    }
}

module.exports = ChildrenRepository;