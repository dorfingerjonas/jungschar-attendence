const nodeMailer = require('nodemailer');
const { promisify } = require('util');
const fs = require('fs');

class EmailController {
    async sendEmail(lessons, groups, children, tutors) {
        const credentials = JSON.parse(await promisify(fs.readFile)('./data/credentials.json', 'utf8'));
        
        return nodeMailer.createTransport({
            host: 'mail.gmx.net',
            port: 587,
            debug: true,
            secure: false,
            auth: {
                user: credentials.email,
                pass: credentials.password
            }
        }).sendMail({
            from: 'dorfingerjonas@gmx.at',
            to: JSON.parse(await promisify(fs.readFile)('./data/receiver.json', 'utf8')),
            replyTo: 'jonas.dorfinger@gmx.at',
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

        if (group[0] !== undefined) {
            message += `<strong>Gruppe:</strong> ${group[0].name}<br><br>`;
            message += '<strong>anwesende GruppenleiterInnen:</strong> ';

            for (const tutor of lesson.tutors) {
                for (const tutor2 of tutors) {
                    if (tutor === tutor2.tutorId && lesson.tutors !== undefined) {
                        selectedTutors.push(tutor2);
                        message += tutor2.name;
                        selectedTutors.length !== lesson.tutors.length ? message += ', ' : '';
                    }
                }
            }

            message += '<br><br> <strong>anwesende Kinder:</strong> ';

            for (const child of lesson.children) {
                for (const child2 of children) {
                    if (child === child2.childId && lesson.children !== undefined) {
                        selectedChildren.push(child2);
                        message += child2.name;
                        selectedChildren.length === lesson.children.length ? message += '<br><br>' : message += ', ';
                    }
                }
            }

            message += '<br><br><br>'
        }
    }

    return message;
}

function getCurrentDate() {
    const localtime = new Date();
    return `${('0' + localtime.getDate()).slice(-2)}.${('0' + (localtime.getMonth() + 1)).slice(-2)}.${localtime.getFullYear()}`;
}

module.exports = EmailController;