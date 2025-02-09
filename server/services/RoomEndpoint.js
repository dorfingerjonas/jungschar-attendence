const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const RoomRepository = require('../controller/RoomRepository');

const repo = new RoomRepository();

app.get('/', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.getAll());
});

app.get('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.findById(req.params?.id));
});

app.post('/', async (req, res) => {
    const room = req.body;

    if (!room.name) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        const response = await repo.add(room);
        console.log(response);
        res.send(response);
    }
});

app.put('/:id', async (req, res) => {
    const room = req.body;

    room.id = parseInt(req.params?.id);

    if (isNaN(room.id)) {
        res.contentType('application/json');
        res.send([]);
    } else if (!room.name) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        res.send(await repo.update(room));
    }
});

app.delete('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.delete(req.params?.id));
});

module.exports = app;