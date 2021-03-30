const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.contentType('application/json');
    res.send('children endpoint is running');
});

module.exports = app;