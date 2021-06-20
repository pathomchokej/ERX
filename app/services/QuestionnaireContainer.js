let QuestionnaireModule = require('../model/Questionnaire');
let Questionnaire = QuestionnaireModule.Questionnaire;

class QuestionnaireContainer {
    constructor() {
        this._questionnaires = [];
    }

    #_questionnaires = [];

    get NumberOfQuestionnaire() {
        return this._questionnaires.length;
    }

    CreateQuestionnaire(questions) {
        let questionnaire = new Questionnaire(this._questionnaires.length);
        this._questionnaires.push(questionnaire);
        return questionnaire;
    }

    GetQuestionnaire(id) {
        return (id >= 0 && id < this.NumberOfQuestionnaire) ? this._questionnaires[id] : undefined;
    }
}

const _questionnaireContainer = new QuestionnaireContainer();
module.exports = _questionnaireContainer;