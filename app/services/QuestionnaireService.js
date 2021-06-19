let QuestionnaireModule = require('../model/Questionnaire');
let Questionnaire = QuestionnaireModule.Questionnaire;

class QuestionnaireService
{
    GetQuestionnaire(id)
    {
        return new Questionnaire(id);
    }
}

module.exports = new QuestionnaireService();