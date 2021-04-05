const fs = require('fs');
const { promisify } = require('util');

const FILE_PATH = './server/data/lessons.json';

class LessonRepository {
    async add(lesson) {
        const lessons = await this.getAll();

        lesson.id = parseInt(lesson.id);

        if (!lesson.id || isNaN(lesson.id)) {
            let id = lessons.length + 1;

            while (lessons.filter(r => r.id === id).length > 0) {
                id++;
            }

            lesson.id = id;
        }

        if (lessons.filter(c => c.id === lesson.id).length > 0) {
            return false;
        }

        lessons.push(lesson);

        fs.writeFile(FILE_PATH, JSON.stringify(lessons), err => {
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
        const lessons = await this.getAll();

        return lessons.filter(c => c.id === parseInt(id))[0] ||{};
    }
}

module.exports = LessonRepository;