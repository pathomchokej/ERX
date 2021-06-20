//const { test, expect } = require('@jest/globals');
//const { describe } = require('yargs');
// prevent to generate upper lines
var _questionnaireContainer = require('../../app/services/QuestionnaireContainer')

describe('QuestionnaireContainer', () => {

    test('Create Questionnaire', () => {
        expect(_questionnaireContainer.NumberOfQuestionnaire).toBe(0);
        let questionnaire = _questionnaireContainer.CreateQuestionnaire([]);
        expect(_questionnaireContainer.NumberOfQuestionnaire).toBe(1);
        expect(questionnaire).toBeDefined();
        expect(questionnaire.ID).toBe(0);
    });

    test('GetQuestionnaire with existing ID', () => {
        if (_questionnaireContainer.NumberOfQuestionnaire <= 0)
            _questionnaireContainer.CreateQuestionnaire([]);

        let expectID = _questionnaireContainer.NumberOfQuestionnaire - 1;


        let questionnaire = _questionnaireContainer.GetQuestionnaire(expectID);
        expect(questionnaire).toBeDefined();
        expect(questionnaire.ID).toBe(expectID);
    });

    test('GetQuestionnaire with Unknown ID', () => {
        let unknownID = _questionnaireContainer.NumberOfQuestionnaire;
        let questionnaire = _questionnaireContainer.GetQuestionnaire(unknownID);
        expect(questionnaire).toBeUndefined();
    });

});