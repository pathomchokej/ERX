let _questionModule = require('../../app/models/Question');
let Question = _questionModule.Question;

describe('Question', () => {

    test('Create Instance', () => {
        let question = new Question('test', undefined);
        expect(question).toBeDefined();
    });

    test('Clone Question', () => {
        let question = new Question('test', undefined);
        let cloneQuestion = question.Clone();
        expect(cloneQuestion).toBeDefined();

        question.SetName('change name');
        question.SetChoices(['q','w']);
        expect(question.Name).toBe('change name');
        expect(question.Choices.length).toBe(2);

        expect(cloneQuestion.Name).toBe('test');
        expect(cloneQuestion.Choices.length).toBe(0);
    });



});