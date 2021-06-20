let QuestionnaireModule = require('../model/Questionnaire');
let Questionnaire = QuestionnaireModule.Questionnaire;

class QuestionnaireContainer {
    constructor() {
        this.#_questionnaires = [];
    }

    #_questionnaires = [];

    get NumberOfQuestionnaire() {
        return this.#_questionnaires.length;
    }

    CreateQuestionnaire(questions) {
        let questionnaire = new Questionnaire(this.NumberOfQuestionnaire);
        this.#_questionnaires.push(questionnaire);
        return questionnaire;
    }

    GetQuestionnaire(id) {
        return (id >= 0 && id < this.NumberOfQuestionnaire) ? this.#_questionnaires[id] : undefined;
    }
}

const _instance = new QuestionnaireContainer(); // singleton not create instance again
module.exports = _instance;