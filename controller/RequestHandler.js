const fs = require('fs');
const { promisify } = require('util');
const ChildrenRepository = require('./ChildrenRepository');
const TutorRepository = require('./TutorRepository');
const UserRepository = require('./UserRepository');
const childrenRepo = new ChildrenRepository();
const tutorRepo = new TutorRepository();
const userRepo = new UserRepository();

class RequestHandler {
    async validateCredentials(data) {
        return await userRepo.validateCredentials(data);
    }
}

module.exports = RequestHandler;
