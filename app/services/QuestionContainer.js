let QuestionModule = require('../model/Question');
let Question = QuestionModule.Question;

class QuestionContainer {

    get NumberOfQuestion() {
        return this.#_questions.length;
    }

    #_questions = [];

    constructor() {
        this.#_questions = [];
    }

    GetQuestion(index) {
        return (index >= 0 && index < this.NumberOfQuestion) ? this.#_questions[index] : undefined;
    }

    AddQuestion(name, choice) {
        let qName = name;
        let qChoice = (choice != null && choice != undefined) ? [...choice] : [];
        this.#_questions.push(new Question(qName, qChoice));
        return this.NumberOfQuestion - 1;
    }

    DeleteQuestion(index) {
        if (index < 0 || index >= this.NumberOfQuestion)
            return false;

        delete this.#_questions[index];
        this.#_questions.splice(index, 1);
        return true;
    }

    UpdateQuestion(index, name, choice) {
        let question = this.GetQuestion(index);
        if (undefined == question || null == question)
            return false;

        let qName = name;
        let qChoice = (choice != null && choice != undefined) ? [...choice] : [];
        question.SetName(qName);
        question.SetChoices(qChoice);
        return true;
    }
}

const _instance = new QuestionContainer(); // singleton not create instance again
module.exports = _instance;