const express = require('express');
const app = express();

const config = {
    port: 8080
}

app.get('/', (req, res) => {
    res.contentType('application/json');
    res.send('running');
});

app.listen(config.port, () => {
    console.log(`listening to http://locaholst:${config.port}`);
});