//const { test, expect } = require('@jest/globals');
//const { describe } = require('yargs');
// prevent to generate upper lines
var _questionnaireService = require('../../app/services/QuestionnaireService')

describe('QuestionnaireService',() => {

test('GetQuestionnaire with ID(1)', () => {
    let questionnaire = _questionnaireService.GetQuestionnaire(1);
    expect(questionnaire).toBeDefined();
    expect(questionnaire.ID).toBe(1);
});

});