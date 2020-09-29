const fs = require('fs');
const { promisify } = require('util');

class TutorRepository {
    async add(tutor) {
        const currentFile = await this.getAll();

        tutor.tutorId = Date.now();

        currentFile.push(tutor);

        fs.writeFile('./data/tutors.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(tutor) {
        const tutors = await this.getAll();

        tutors[tutors.findIndex(r => r.tutorId === tutor.tutorId)] = tutor;

        fs.writeFile('./data/tutors.json', JSON.stringify(tutors), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(tutor) {
        const currentFile = await this.getAll();

        fs.writeFile('./data/tutors.json', JSON.stringify(currentFile.filter(r => r.tutorId !== tutor.tutorId)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/tutors.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        return JSON.parse(await promisify(fs.readFile)('./data/tutors.json', 'utf8'));
    }
}

module.exports = TutorRepository;
