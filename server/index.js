const express = require('express');
const app = express();

const endpoints = {
    childrenEP: require('./services/ChildrenEndpoint'),
    roomEP: require('./services/RoomEndpoint'),
    groupEP: require('./services/GroupEndpoint'),
    tutorEP: require('./services/TutorEndpoint'),
    lessonEP: require('./services/LessonEndpoint')
};

const config = {
    port: 8080
}

app.get('/', (req, res) => {
    res.contentType('application/json');
    res.send('running');
});

app.use('/children', endpoints.childrenEP);
app.use('/rooms', endpoints.roomEP);
app.use('/groups', endpoints.groupEP);
app.use('/tutors', endpoints.tutorEP);
app.use('/lessons', endpoints.lessonEP);

app.listen(config.port, () => {
    console.log(`listening to http://localhost:${config.port}`);
});