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
    async getGroups() {
        return await groupsRepo.getAll();
    }

    async getChildrenByGroupId(groupId) {
        return await childrenRepo.getChildrenByGroupId(groupId);
    }

    async getTutors() {
        return await tutorRepo.getAll();
    }

    }
}

module.exports = RequestHandler;
