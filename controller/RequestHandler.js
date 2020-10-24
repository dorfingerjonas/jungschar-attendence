const fs = require('fs');
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
            return await lessonsRepo.add(lesson);
        } else if (duplicate.length > 0) {
            lesson.lessonId = duplicate[0].lessonId;
            return await lessonsRepo.update(lesson);
        }
    }

    async getLessonByGroupId(groupId) {
        return await lessonsRepo.getLessonsByGroupId(groupId);
    }

    async getLessons() {
        return await lessonsRepo.getAll();
    }

    async createBackup() {
        const localtime = new Date();
        const lessons = await this.getLessons();
        const groups = await this.getGroups();
        const children = await this.getChildren();
        const tutors = await this.getTutors();

        let response;
        const date = `${localtime.getFullYear()}-${('0' + (localtime.getMonth() + 1)).slice(-2)}-${('0' + localtime.getDate()).slice(-2)}`;

        if (lessons.length !== 0) {
            response = await emailController.sendEmail(lessons, groups, children, tutors) || {};
        }
        
        if (response !== undefined) {
            if (response.rejected.length === 0) {
                try {
                    fs.readdirSync('./backup');
                } catch (err) {
                    fs.mkdirSync('./backup');
                }

                fs.copyFile('./data/lessons.json', `./backup/jungschar-attendence_${date}.json`, fs.constants.COPYFILE_FICLONE, () => {
                    lessonsRepo.deleteAll();
                });

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async updateChild(child) {
        return await childrenRepo.update(child);
    }

    async updateTutor(tutor) {
        return await tutorRepo.update(tutor);
    }

    async updateGroup(group) {
        return await groupsRepo.update(group);
    }

    async addChild(child) {
        return await childrenRepo.add(child);
    }

    async addTutor(tutor) {
        return await tutorRepo.add(tutor);
    }

    async addGroup(group) {
        return await groupsRepo.add(group);
    }

    async deleteChild(child) {
        return await childrenRepo.delete(child);
    }

    async deleteTutor(tutor) {
        return await tutorRepo.delete(tutor);
    }

    async deleteGroup(group) {
        return await groupsRepo.delete(group);
    }
}

module.exports = RequestHandler;
