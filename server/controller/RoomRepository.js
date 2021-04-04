const fs = require('fs');
const { promisify } = require('util');

const FILE_PATH = './data/rooms.json';

class RoomRepository {
    async add(room) {
        const currentFile = await this.getAll();

        room.id = parseInt(room.id);

        if (!room.id || isNaN(room.id)) {
            let id = currentFile.length + 1;

            while (currentFile.filter(r => r.id === id).length > 0) {
                id++;
            }

            room.id = id;
        }

        if (currentFile.filter(c => c.id === room.id).length > 0) {
            return false;
        }

        currentFile.push(room);

        fs.writeFile(FILE_PATH, JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async update(room) {
        const rooms = await this.getAll();

        rooms[rooms.findIndex(r => r.id === room.id)] = room;

        fs.writeFile(FILE_PATH, JSON.stringify(rooms), err => {
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
        const rooms = await this.getAll();

        return rooms.filter(c => c.id === parseInt(id));
    }
}

module.exports = RoomRepository;