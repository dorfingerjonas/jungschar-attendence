const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ChildrenRepository = require('../controller/ChildrenRepository');

const repo = new ChildrenRepository();

app.get('/', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.getAll());
});

app.get('/:id', async (req, res) => {
    res.contentType('application/json');
    res.send(await repo.findById(req.params?.id));
});

app.post('/', async (req, res) => {
    const child = req.body;

    child.id = parseInt(child.id);
    child.groupId = parseInt(child.groupId);

    if (
        !child.name
        || !child.groupId
        || isNaN(child.id)
        || isNaN(child.groupId)
    ) {
        res.sendStatus(400);
    } else {
        res.contentType('application/json');
        res.send(await repo.add(req.body));
    }
});

module.exports = app;