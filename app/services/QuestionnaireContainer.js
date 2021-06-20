let QuestionnaireModule = require('../models/Questionnaire');
let Questionnaire = QuestionnaireModule.Questionnaire;

class QuestionnaireContainer {
    constructor() {
    }

    #_questionnaires = [];

    get NumberOfQuestionnaire() {
        return this.#_questionnaires.length;
    }

    CreateQuestionnaire(questions) {
        let questionnaire = new Questionnaire(questions);
        this.#_questionnaires.push(questionnaire);
        return this.#_questionnaires.length - 1;
    }

    GetQuestionnaire(index) {
        return (index >= 0 && index < this.NumberOfQuestionnaire) ? this.#_questionnaires[index] : undefined;
    }
}

const _instance = new QuestionnaireContainer(); // singleton not create instance again
module.exports = {
    Instance : _instance,
    QuestionnaireContainer : QuestionnaireContainer
}