const nodeMailer = require('nodemailer');
const credentials = require('../data/credentials.json');

class EmailController {
    async sendEmail(lessons, groups, children, tutors) {
        return nodeMailer.createTransport({
            host: 'mail.gmx.com',
            port: 587,
            debug: true,
            secure: false,
            auth: {
                user: credentials.email,
                pass: credentials.password
            }
        }).sendMail({
            from: 'jonas.dorfinger@gmx.at',
            to: ['dorfingerjonas@gmx.at', 'jonas.dorfinger@gmx.at'],
            subject: `Jungschar Anwesenheit - ${getCurrentDate()}`,
            html: createMessageContent(lessons, groups, children, tutors)
        });
    }
}

function createMessageContent(lessons, groups, children, tutors) {
    let message = `<strong style='font-size: 1.7em'>Anwesenheiten Jungschar Stunde am ${getCurrentDate()}</strong><br><br><br>`;

    for (const lesson of lessons) {
        const selectedChildren = [];
        const selectedTutors = [];

        const group = groups.filter(g => g.groupId === lesson.groupId);

        message += `<strong>Gruppe:</strong> ${group[0].name}<br><br>`;
        message += '<strong>anwesende GruppenleiterInnen:</strong> ';

        for (const tutor of lesson.tutors) {
            for (const tutor2 of tutors) {
                if (tutor === tutor2.tutorId) {
                    selectedTutors.push(tutor2);
                    message += tutor2.name;
                    selectedTutors.length === lesson.tutors.length ? message += '<br><br>' : message += ', ';
                }
            }
        }

        message += '<strong>anwesende Kinder:</strong> ';

        for (const child of lesson.children) {
            for (const child2 of children) {
                if (child === child2.childId) {
                    selectedChildren.push(child2);
                    message += `${child2.firstName} ${child2.lastName}`;
                    selectedChildren.length === lesson.children.length ? message += '<br><br>' : message += ', ';
                }
            }
        }

        message += '<br><br><br>'
    }

    return message;
}

function getCurrentDate() {
    const localtime = new Date();
    return `${('0' + localtime.getDate()).slice(-2)}.${('0' + (localtime.getMonth() + 1)).slice(-2)}.${localtime.getFullYear()}`;
}

module.exports = EmailController;