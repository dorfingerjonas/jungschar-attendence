const express = require('express');
const app = express();

const endpoints = {
    childrenEP: require('./services/ChildrenEndpoint')
};

const config = {
    port: 8080
}

app.get('/', (req, res) => {
    res.contentType('application/json');
    res.send('running');
});

app.use('/children', endpoints.childrenEP);

app.listen(config.port, () => {
    console.log(`listening to http://localhost:${config.port}`);
});