const QuestionContainerModule = require('../services/QuestionContainer');
const QuestionnaireContainerModule = require('../services/QuestionnaireContainer');
const CountryHelperModule = require('../helpers/CountryHelper');
const OccupationHelperModule = require('../helpers/OccupationHelper');

class QuestionnaireController {

    #_questionContainer = QuestionContainerModule.Instance;
    #_questionnaireContainer = QuestionnaireContainerModule.Instance;
    #_countryHelper = CountryHelperModule.Instance;
    #_occupationHelper = OccupationHelperModule.Instance;

    get NumberOfQuestionnaire() {
        return this.#_questionnaireContainer.NumberOfQuestionnaire;
    }

    constructor() {
        this.#InitializeQuestions();
    }

    #InitializeQuestions() {
        this.#_questionContainer.AddQuestion('Title', ['Mr.', 'Ms.', 'Mrs.']);
        this.#_questionContainer.AddQuestion('First Name', undefined);
        this.#_questionContainer.AddQuestion('Last Name', undefined);
        this.#_questionContainer.AddQuestion('Date of birth', undefined);
        this.#_questionContainer.AddQuestion('Country of residence', this.#_countryHelper.GetCountries());
        this.#_questionContainer.AddQuestion('House Address', undefined);
        this.#_questionContainer.AddQuestion('Work Address', undefined);
        this.#_questionContainer.AddQuestion('Occupation', this.#_occupationHelper.GetOccupations());
        this.#_questionContainer.AddQuestion('Job Titles', undefined);
        this.#_questionContainer.AddQuestion('Business Type', undefined);

    }

    GetInformation() {
        let str = '=======================================================\n';
        str += '=================  List of Questions  =================\n';
        str += '=======================================================\n';

        for (let i = 0; i < this.#_questionContainer.NumberOfQuestion; i++) {
            str += this.#_questionContainer.GetQuestion(i).toString() + '\n';
        }
        str += '=======================================================\n';

        return str;
    }

    CreateQuestionnaire() {
        let questions = this.#_questionContainer.GetQuestionForBuildQuetionnaire();
        let questionnaireIndex = this.#_questionnaireContainer.CreateQuestionnaire(questions);
        return questionnaireIndex;
    }

    GetNumberOfQuestion(questionnaireIndex){
        let questionnaire = this.#_questionnaireContainer.GetQuestionnaire(questionnaireIndex);
        if (questionnaire == undefined)
            return undefined;

        return questionnaire.NumberOfQuestion;
    }

    GetNumberOfAnswer(questionnaireIndex){
        let questionnaire = this.#_questionnaireContainer.GetQuestionnaire(questionnaireIndex);
        if (questionnaire == undefined)
            return undefined;

        return questionnaire.NumberOfAnswer;
    }

    GetQuestion(questionnaireIndex, questionIndex) {
        let questionnaire = this.#_questionnaireContainer.GetQuestionnaire(questionnaireIndex);
        if (questionnaire == undefined)
            return undefined;

        return questionnaire.GetQuestion(questionIndex);
    }
}

const _instance = new QuestionnaireController(); // singleton not create instance again
module.exports = {
    Instance: _instance,
}