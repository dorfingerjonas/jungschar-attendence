const fs = require('fs');
const { promisify } = require('util');

const FILE_PATH = './data/tutors.json';

class TutorRepository {
    async add(tutor) {
        const tutorren = await this.getAll();

        tutor.id = parseInt(tutor.id);

        if (!tutor.id || isNaN(tutor.id)) {
            let id = tutorren.length + 1;

            while (tutorren.filter(r => r.id === id).length > 0) {
                id++;
            }

            tutor.id = id;
        }

        if (tutorren.filter(c => c.id === tutor.id).length > 0) {
            return false;
        }

        tutorren.push(tutor);

        fs.writeFile(FILE_PATH, JSON.stringify(tutorren), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async update(tutor) {
        const tutorren = await this.getAll();

        tutorren[tutorren.findIndex(r => r.id === tutor.id)] = tutor;

        fs.writeFile(FILE_PATH, JSON.stringify(tutorren), err => {
            if (err) {
                console.error(err);
                return false;
            } else {
                return true;
            }
        });
    }

    async delete(id) {
        const tutorren = await this.getAll();
        
        fs.writeFile(FILE_PATH, JSON.stringify(tutorren.filter(r => r.id !== parseInt(id))), err => {
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
        const tutorren = await this.getAll();

        return tutorren.filter(c => c.id === parseInt(id))[0] ||{};
    }
}

module.exports = TutorRepository;