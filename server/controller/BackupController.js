const fs = require('fs')
const { promisify } = require('util')
const nodeMailer = require('nodemailer')

const LessonRepository = require('./LessonRepository')

const BACKUP_DIR = 'backups'

const repo = new LessonRepository()

class BackupController {
  async createBackup () {
    const lessons = await repo.getAll()
    // const lessons = [
    //   {
    //     'children': [
    //       {
    //         'name': 'Anna Weber',
    //         'group': 2,
    //         'id': 28,
    //       },
    //       {
    //         'name': 'Jeremias Neumüller',
    //         'group': 2,
    //         'id': 24,
    //       },
    //       {
    //         'name': 'Pia Kaufmann',
    //         'group': 2,
    //         'id': 19,
    //       },
    //     ],
    //     'tutors': [
    //       {
    //         'name': 'Hannah Schoberleitner',
    //         'id': 1,
    //       },
    //       {
    //         'name': 'Jonas Dorfinger',
    //         'id': 2,
    //       },
    //     ],
    //     'group': {
    //       'name': '4. VS & 1./2. NMS/GYM',
    //       'room': 5,
    //       'id': 2,
    //     },
    //     'room': {
    //       'id': 1,
    //       'name': 'Pfarrsaal',
    //     },
    //     'note': '',
    //     'id': 1,
    //   },
    //   {
    //     'children': [
    //       {
    //         'name': 'Anna Weber',
    //         'group': 2,
    //         'id': 28,
    //       },
    //     ],
    //     'tutors': [
    //       {
    //         'name': 'Hannah Schoberleitner',
    //         'id': 1,
    //       },
    //       {
    //         'name': 'Hannah Tropper',
    //         'id': 11,
    //       },
    //       {
    //         'name': 'Jonas Dorfinger',
    //         'id': 2,
    //       },
    //       {
    //         'name': 'Julia Feldbauer',
    //         'id': 12,
    //       },
    //     ],
    //     'group': {
    //       'name': '4. VS & 1./2. NMS/GYM',
    //       'room': 5,
    //       'id': 2,
    //     },
    //     'room': {
    //       'name': 'Jungschar Raum 2',
    //       'id': 4,
    //     },
    //     'note': '',
    //     'id': 2,
    //   },
    //   {
    //     'children': [],
    //     'tutors': [],
    //     'group': {
    //       'name': '3./4. NMS/GYM',
    //       'room': 4,
    //       'id': 3,
    //     },
    //     'room': {
    //       'name': 'Jungschar Raum 1',
    //       'id': 3,
    //     },
    //     'note': '',
    //     'id': 3,
    //   },
    //   {
    //     'children': [
    //       {
    //         'name': 'Emilian Tropper',
    //         'group': 1,
    //         'id': 12,
    //       },
    //       {
    //         'name': 'Florian Helmberger',
    //         'group': 1,
    //         'id': 8,
    //       },
    //       {
    //         'name': 'Lily Schöpf',
    //         'group': 1,
    //         'id': 11,
    //       },
    //       {
    //         'name': 'Maria Helmberger',
    //         'group': 1,
    //         'id': 9,
    //       },
    //       {
    //         'name': 'Pauline Tropper',
    //         'group': 1,
    //         'id': 13,
    //       },
    //       {
    //         'name': 'Smilla Kaufmann',
    //         'group': 1,
    //         'id': 10,
    //       },
    //       {
    //         'name': 'Sophie Burrer',
    //         'group': 1,
    //         'id': 2,
    //       },
    //     ],
    //     'tutors': [
    //       {
    //         'name': 'Emilia Heiter',
    //         'id': 8,
    //       },
    //       {
    //         'name': 'Hannah Schoberleitner',
    //         'id': 1,
    //       },
    //       {
    //         'name': 'Jonas Dorfinger',
    //         'id': 2,
    //       },
    //     ],
    //     'group': {
    //       'name': '1./2./3. VS',
    //       'room': 2,
    //       'id': 1,
    //     },
    //     'room': {
    //       'name': 'Kirchenplatz',
    //       'id': 6,
    //     },
    //     'note': 'waren draußen, idk',
    //     'id': 4,
    //   },
    // ]
    const localtime = new Date()

    const date = `${localtime.getFullYear()}-${('0' +
      (localtime.getMonth() + 1)).slice(-2)}-${('0' +
      localtime.getDate()).slice(-2)}`

    try {
      fs.readdirSync(BACKUP_DIR)
    } catch (err) {
      fs.mkdirSync(BACKUP_DIR)
    }

    await sendEmail(await createEmailContent(lessons))

    fs.writeFile(`${BACKUP_DIR}/backup_${date}.json`,
      JSON.stringify(lessons), () => {
        repo.deleteAll()
        console.log('would delete all here')
      })
  }
}

async function createEmailContent (lessons) {
  let message = `<strong style='font-size: 1.7em'>Anwesenheiten Jungschar Stunde am ${getCurrentDate()}</strong><br><br><br><br>`

  for (const lesson of lessons) {
    message += `<p><strong>Gruppe:</strong> ${lesson.group?.name}</p>`
    message += `<p><strong>Räumlichkeit:</strong> ${lesson.room?.name}</p>`
    message += `<p><strong>Annmerkung:</strong> ${lesson.note === ''
      ? '-'
      : lesson.note}</p>`

    message += `<p><strong>LeiterInnen:</strong> ${generatePersonList(
      lesson.tutors)}`

    message += `<p><strong>Kinder:</strong> ${generatePersonList(
      lesson.children)}`

    message += '<br><br><br>'
  }

  return message
}

async function sendEmail (content) {
  const credentials = JSON.parse(
    await promisify(fs.readFile)('./server/data/credentials.json', 'utf8'))

  return nodeMailer.createTransport({
    host: 'smtp.world4you.com',
    port: 587,
    debug: false,
    secure: false,
    auth: {
      user: credentials.email,
      pass: credentials.password,
    },
  }).sendMail({
    from: {
      name: 'Jungschar Attendance',
      address: 'jungschar.attendance@dorfingerjonas.at',
    },
    to: JSON.parse(
      await promisify(fs.readFile)('./server/data/receiver.json', 'utf8')),
    replyTo: 'contact@dorfingerjonas.at',
    subject: `Jungschar Anwesenheit - ${getCurrentDate()}`,
    html: content,
  })
}

function getCurrentDate () {
  const localtime = new Date()
  return `${('0' + localtime.getDate()).slice(-2)}.${('0' +
    (localtime.getMonth() + 1)).slice(-2)}.${localtime.getFullYear()}`
}

function generatePersonList (persons) {
  let list = ''

  for (const person of persons) {
    list += person.name + ', '
  }

  if (persons.length === 0) {
    list += ' -'
  } else {
    list = list.substring(0, list.length - 2)
  }

  list += '</p>'

  return list
}

module.exports = BackupController
