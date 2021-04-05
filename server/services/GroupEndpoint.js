const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const GroupRepository = require('../controller/GroupRepository');
const RoomRepository = require('../controller/RoomRepository');

const repo = new GroupRepository();
const roomRepo = new RoomRepository();

app.get('/', async (req, res) => {
    const groups = await repo.getAll();
    
    for (let i = 0; i < groups.length; i++) {
        groups[i].room = await roomRepo.findById(groups[i].room || 0);
    }
    
    res.contentType('application/json');
    res.send(groups);
});

app.get('/:id', async (req, res) => {
    const group = await repo.findById(req.params?.id || 0);

    group.room = await roomRepo.findById(group.room || 0);
    
    res.contentType('application/json');
    res.send(group);
});

app.post('/', async (req, res) => {
    const group = req.body;

    group.room = parseInt(group.room);

    if (!group.name || !group.room || isNaN(group.room)) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        const response = await repo.add(group);
        res.send(response);
    }
});

app.put('/:id', async (req, res) => {
    const group = req.body;

    group.id = parseInt(req.params?.id);
    group.room = parseInt(group.room);

    if (isNaN(group.id)) {
        res.contentType('application/json');
        res.send([]);
    } else if (!group.name || isNaN(group.room)) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        res.send(await repo.update(group));
    }
});

app.delete('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.delete(req.params?.id));
});

module.exports = app;