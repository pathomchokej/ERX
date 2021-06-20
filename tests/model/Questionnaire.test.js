const QuestionModule = require('../../app/models/Question');
const QuestionnaireModule = require('../../app/models/Questionnaire');
const Question = QuestionModule.Question;
const Questionnaire = QuestionnaireModule.Questionnaire;

describe('Questionnaire', () => {

    test('Create Instance with empty question', () => {
        let questionnaire = new Questionnaire([]);
        expect(questionnaire).toBeDefined();
        expect(questionnaire.NumberOfQuestion).toBe(0);
    });

    test('Create Instance with undefined question', () => {
        let questionnaire = new Questionnaire(undefined);
        expect(questionnaire).toBeDefined();
        expect(questionnaire.NumberOfQuestion).toBe(0);
    });

    test('Create Instance with 3 questions', () => {
        let expectQuestions = [
            new Question('Title', ['Mr', 'Ms', 'Miss']),
            new Question('First Name'),
            new Question('Last Name')
        ];

        let questionnaire = new Questionnaire(expectQuestions);
        expect(questionnaire).toBeDefined();
        expect(questionnaire.NumberOfQuestion).toBe(expectQuestions.length);
        for (i = 0; i < expectQuestions.length; i++) {
            let expectQuestion = expectQuestions[i];
            let validateQuestion = questionnaire.GetQuestion(i);
            expect(validateQuestion).toBeDefined();
            expect(validateQuestion.Name).toBe(expectQuestion.Name);
            expect(validateQuestion.Choices).toBeDefined();
            expect(validateQuestion.Choices.length).toBe(expectQuestion.Choices.length);
            for (choiceIndex = 0; choiceIndex < validateQuestion.Choices.length; choiceIndex++)
                expect(validateQuestion.Choices[choiceIndex]).toBe(expectQuestion.Choices[choiceIndex]);
        }
    });

    test('Answer all question', () => {
        let expectQuestions = [
            new Question('Title', ['Mr', 'Ms', 'Miss']),
            new Question('First Name'),
            new Question('Last Name')
        ];
        let expectAnswer = ['Mr', 'P', 'Jr'];

        let questionnaire = new Questionnaire(expectQuestions);
        for (i = 0; i < questionnaire.NumberOfQuestion; i++) {
            let result = questionnaire.SetAnswer(i, expectAnswer[i]);
            expect(result).toBeTruthy();
        }
        expect(questionnaire.NumberOfAnswer).toBe(expectAnswer.length);
        for (i = 0; i < questionnaire.NumberOfAnswer; i++) {
            expect(questionnaire.GetAnswer(i)).toBe(expectAnswer[i]);
        }
    });

    test('Answer (index is out of range)', () => {
        let expectQuestions = [
            new Question('Title', ['Mr', 'Ms', 'Miss']),
            new Question('First Name'),
            new Question('Last Name')
        ];

        let questionnaire = new Questionnaire(expectQuestions);
        let result = questionnaire.SetAnswer(questionnaire.NumberOfQuestion + 1, '');
        expect(result).toBeFalsy();
        expect(questionnaire.NumberOfAnswer).toBe(0);

    });

    test('GetAnswer (index is out of range)', () => {
        let expectQuestions = [
            new Question('Title', ['Mr', 'Ms', 'Miss']),
            new Question('First Name'),
            new Question('Last Name')
        ];

        let questionnaire = new Questionnaire(expectQuestions);
        let result = questionnaire.SetAnswer(-1, '');
        expect(result).toBeFalsy();
        expect(questionnaire.NumberOfAnswer).toBe(0);
        expect(questionnaire.GetAnswer(20)).toBeUndefined();

    });


});