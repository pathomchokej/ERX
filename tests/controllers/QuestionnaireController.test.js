const { expect } = require('@jest/globals');
const QuestionnaireControllerModule = require('../../app/controllers/QuestionnaireController');
let _controller = QuestionnaireControllerModule.Instance;


describe('QuestionnaireController', () => {

    test('Create Instance', () => {
        expect(_controller).toBeDefined();
        expect(_controller.GetInformation().length).toBeGreaterThan(0);
    });

    test('Create Questionnaire', () => {
        let expectQuestionnaireCount = _controller.NumberOfQuestionnaire + 1;
        let expectIndex = _controller.NumberOfQuestionnaire;
        let questionnaireIndex = _controller.CreateQuestionnaire();
        expect(_controller.NumberOfQuestionnaire).toBe(expectQuestionnaireCount);
        expect(questionnaireIndex).toBe(expectIndex);
    });

    test('Get Question', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire - 1;
        let question = _controller.GetQuestion(questionnaireIndex, 0);
        expect(question).toBeDefined();
        expect(question.Name).toBe('Title');
        expect(question.Choices.length).toBe(3);
    });

    test('Get Question (index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire - 1;
        let missingIndex = _controller.GetNumberOfQuestion(questionnaireIndex) + 1;
        let question = _controller.GetQuestion(questionnaireIndex, missingIndex);
        expect(question).toBeUndefined();
    });

    test('Get Number of Question', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire - 1;
        let numberOfQuestion = _controller.GetNumberOfQuestion(questionnaireIndex);
        expect(numberOfQuestion).toBe(10);
    });

    test('Get Question (questionnaire index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire + 1;
        let missingNumberOfQuestion = _controller.GetNumberOfQuestion(questionnaireIndex);
        expect(missingNumberOfQuestion).toBeUndefined();
    });
});