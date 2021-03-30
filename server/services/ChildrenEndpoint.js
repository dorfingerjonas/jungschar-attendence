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

module.exports = app;