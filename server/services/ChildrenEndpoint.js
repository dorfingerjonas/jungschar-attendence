const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ChildrenRepository = require('../controller/ChildrenRepository');
const GroupRepository = require('../controller/GroupRepository');

const repo = new ChildrenRepository();
const groupRepo = new GroupRepository();

app.get('/', async (req, res) => {
    const children = await repo.getAll();
    
    for (let i = 0; i < children.length; i++) {
        children[i].group = await groupRepo.findById(children[i].group);
    }

    res.contentType('application/json');
    res.send(children);
});

app.get('/:id', async (req, res) => {    
    const child = await repo.findById(req.params?.id);
    child.group = await groupRepo.findById(child.group);
    
    res.contentType('application/json');
    res.send(child);
});

app.get('/byGroup/:id', async (req, res) => {
    const children = (await repo.getAll()).filter(c => c.group === parseInt(req.params?.id));
    
    for (let i = 0; i < children.length; i++) {
        children[i].group = await groupRepo.findById(children[i].group);
    }
    
    res.contentType('application/json');
    res.send(children);
});

app.post('/', async (req, res) => {
    const child = req.body;

    child.groupId = parseInt(child.groupId);

    if (
        !child.name
        || !child.groupId
        || isNaN(child.groupId)
    ) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        const response = await repo.add(child);
        res.send(response);
    }
});

app.put('/:id', async (req, res) => {
    const child = req.body;

    child.id = parseInt(req.params?.id);
    child.groupId = parseInt(child.groupId);

    if (isNaN(child.id)) {
        res.contentType('application/json');
        res.send([]);
    } else if (
        !child.name
        || !child.groupId
        || isNaN(child.groupId)
    ) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        res.send(await repo.update(child));
    }
});

app.delete('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.delete(req.params?.id));
});

module.exports = app;