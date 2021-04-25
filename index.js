const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(__dirname + '/client/dist/client/'));
app.use('/api', require('./server/index'));

app.get('/', (req, res) => {
    res.type('html')
    res.sendFile(__dirname + '/client/dist/client/index.html');
});

app.listen(80, () => {
    console.log(`listening to http://localhost/`);
});