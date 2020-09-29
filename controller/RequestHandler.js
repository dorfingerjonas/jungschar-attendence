const fs = require('fs');
const { promisify } = require('util');
const ChildrenRepository = require('./ChildrenRepository');
const TutorRepository = require('./TutorRepository');
const GroupsRepository = require('./GroupsRepository');
const LessonsRepository = require('./LessonsRepository');
const EmailController = require('./EmailController');
const childrenRepo = new ChildrenRepository();
const tutorRepo = new TutorRepository();
const groupsRepo = new GroupsRepository();
const lessonsRepo = new LessonsRepository();
const emailController = new EmailController();

class RequestHandler {
    async validateCredentials(data) {
        return await userRepo.validateCredentials(data);
    }
}

module.exports = RequestHandler;
