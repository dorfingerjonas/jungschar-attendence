const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const LessonRepository = require('../controller/LessonRepository');
const RoomRepository = require('../controller/RoomRepository');
const GroupRepository = require('../controller/GroupRepository');
const ChildrenRepository = require('../controller/ChildrenRepository');
const TutorRepository = require('../controller/TutorRepository');

const repo = new LessonRepository();
const roomRepo = new RoomRepository();
const groupRepo = new GroupRepository();
const childrenRepo = new ChildrenRepository();
const tutorRepo = new TutorRepository();

app.get('/', async (req, res) => {
    const lessons = await repo.getAll();
    
    for (let i = 0; i < lessons.length; i++) {
        lessons[i] = await fullfillObject(lessons[i]);
    }
    
    res.contentType('application/json');
    res.send(lessons);
});

app.get('/:id', async (req, res) => {
    const lesson = await fullfillObject(await repo.findById(req.params?.id || 0));
    
    res.contentType('application/json');
    res.send(lesson);
});

app.post('/', async (req, res) => {
    const lesson = req.body;

    lesson.group = parseInt(lesson.group);
    lesson.room = parseInt(lesson.room);
    lesson.tutors = JSON.parse(lesson.tutors);
    lesson.children = JSON.parse(lesson.children);

    if (isNaN(lesson.room) || isNaN(lesson.room) || !lesson.tutors || !lesson.children) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        const response = await repo.add(lesson);
        res.send(response);
    }
});

async function fullfillObject(lesson) {
    lesson.group = await groupRepo.findById(lesson.group || 0);
    lesson.room = await roomRepo.findById(lesson.room || 0);

    for (let j = 0; j < lesson.tutors.length; j++) {
        lesson.tutors[j] = await tutorRepo.findById(lesson.tutors[j] || 0);
    }

    for (let j = 0; j < lesson.children.length; j++) {
        lesson.children[j] = await childrenRepo.findById(lesson.children[j] || 0);
    }

    return lesson;
}

module.exports = app;