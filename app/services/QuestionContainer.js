let QuestionModule = require('../models/Question');
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

    AddQuestion(name, choices) {
        this.#_questions.push(new Question(name, choices));
        return this.NumberOfQuestion - 1;
    }

    DeleteQuestion(index) {
        if (index < 0 || index >= this.NumberOfQuestion)
            return false;

        delete this.#_questions[index];
        this.#_questions.splice(index, 1);
        return true;
    }

    UpdateQuestion(index, name, choices) {
        let question = this.GetQuestion(index);
        if (undefined == question || null == question)
            return false;

        question.SetName(name);
        question.SetChoices(choices);
        return true;
    }

    GetQuestionForBuildQuetionnaire() {
        let cloneQuestions = [];
        for (let i = 0; i < this.#_questions.length; i++)
            cloneQuestions[i] = this.#_questions[i].Clone();

        return cloneQuestions;
    }
}

const _instance = new QuestionContainer(); // singleton not create instance again
module.exports = {
    Instance : _instance,
    QuestionContainer : QuestionContainer
}