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
        let result = _controller.GetQuestion(questionnaireIndex, 0);
        expect(result).toBeDefined();
        expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireSuccess);
        let question = result.Data;
        expect(question.Name).toBe('Title');
        expect(question.Choices.length).toBe(3);
    });

    test('Get Question (questionnaire index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let result = _controller.GetQuestion(100, 100);
        expect(result).toBeDefined();
        expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireFailed);
    });

    test('Get Question (question index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let result = _controller.GetQuestion(0, -1);
        expect(result).toBeDefined();
        expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireFailed);
    });

    test('Get Number of Question', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire - 1;
        let numberOfQuestion = _controller.GetNumberOfQuestion(questionnaireIndex);
        expect(numberOfQuestion).toBe(10);
    });

    test('Get Number of Question (questionnaire index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire + 1;
        let missingNumberOfQuestion = _controller.GetNumberOfQuestion(questionnaireIndex);
        expect(missingNumberOfQuestion).toBeUndefined();
    });

    test('Set answer at last question', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
            let questionnaireIndex = _controller.NumberOfQuestionnaire - 1;
            let questionIndex = _controller.GetNumberOfQuestion(questionnaireIndex) - 1;
            let result = _controller.SetAnswer(questionnaireIndex, questionIndex, 'test')
            expect(result).toBeDefined();
            expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireSuccess);
    });

    test('Set answer (questionnaire index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
            let result = _controller.SetAnswer(100, 0, 'test')
            expect(result).toBeDefined();
            expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireFailed);
    });

    test('Set answer (question index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
            let result = _controller.SetAnswer(0, 200, 'test')
            expect(result).toBeDefined();
            expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireFailed);
    });

    test('Get Answer', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let questionnaireIndex = _controller.NumberOfQuestionnaire - 1;
        _controller.SetAnswer(questionnaireIndex,0, 'Mr.');
        let result = _controller.GetAnswer(questionnaireIndex, 0);
        expect(result).toBeDefined();
        expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireSuccess);
        let answer = result.Data;
        expect(answer).toBe('Mr.');
    });

    test('Get Answer (questionnaire index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let result = _controller.GetAnswer(100, 100);
        expect(result).toBeDefined();
        expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireFailed);
    });

    test('Get Answer (question index is out of range)', () => {
        if (_controller.NumberOfQuestionnaire <= 0)
            _controller.CreateQuestionnaire();
            
        let result = _controller.GetAnswer(0, -1);
        expect(result).toBeDefined();
        expect(result.Result).toBe(QuestionnaireControllerModule.QustionnaireFailed);
    });

});