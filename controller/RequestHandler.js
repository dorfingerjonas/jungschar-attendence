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

    async getChildren() {
        return await childrenRepo.getAll();
    }

    async saveLesson(lesson) {
        const lessons = await lessonsRepo.getAll();
        const duplicate = lessons.filter(l => l.groupId === lesson.groupId);

        if (duplicate.length === 0) {
            lessonsRepo.add(lesson);
        } else if (duplicate.length > 0) {
            lesson.lessonId = duplicate[0].lessonId;
            lessonsRepo.update(lesson);
        }
    }

    }
}

module.exports = RequestHandler;
