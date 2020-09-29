const fs = require('fs');
const { promisify } = require('util');

class LessonsRepository {
    async add(lesson) {
        const currentFile = await this.getAll();

        lesson.lessonId = Date.now();

        currentFile.push(lesson);

        fs.writeFile('./data/lessons.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(lesson) {
        const lessons = await this.getAll();

        lessons[lessons.findIndex(r => r.lessonId === lesson.lessonId)] = lesson;

        fs.writeFile('./data/lessons.json', JSON.stringify(lessons), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(lesson) {
        const currentFile = await this.getAll();

        fs.writeFile('./data/lessons.json', JSON.stringify(currentFile.filter(r => r.lessonId !== lesson.lessonId)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/lessons.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        return JSON.parse(await promisify(fs.readFile)('./data/lessons.json', 'utf8'));
    }

    async getLessonsByGroupId(groupId) {
        const lessons = await this.getAll();

        return lessons.filter(r => r.groupId === parseInt(groupId));
    }
}

module.exports = LessonsRepository;
