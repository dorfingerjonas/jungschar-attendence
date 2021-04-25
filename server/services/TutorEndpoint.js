const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const TutorRepository = require('../controller/TutorRepository');

const repo = new TutorRepository();

app.get('/', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.getAll());
});

app.get('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.findById(req.params?.id));
});

app.post('/', async (req, res) => {
    const tutor = req.body;

    if (!tutor.name) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        const response = await repo.add(tutor);
        res.send(response);
    }
});

app.put('/:id', async (req, res) => {
    const tutor = req.body;

    tutor.id = parseInt(req.params?.id);

    if (isNaN(tutor.id)) {
        res.contentType('application/json');
        res.send([]);
    } else if (!tutor.name) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        res.send(await repo.update(tutor));
    }
});

app.delete('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.delete(req.params?.id));
});

module.exports = app;