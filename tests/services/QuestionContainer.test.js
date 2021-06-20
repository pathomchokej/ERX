const QuestionContainerModule = require('../../app/services/QuestionContainer');
let _questionContainer = new QuestionContainerModule.QuestionContainer;

describe('QuestionContainer', () => {

    test('Create Instance', () => {
        expect(_questionContainer).toBeDefined();
    });

    test('Get Question with out of range index', () => {
        let unknownIndex = _questionContainer.NumberOfQuestion;
        let question = _questionContainer.GetQuestion(unknownIndex);
        expect(question).toBeUndefined();
    });

    test('Get Question with existing index', () => {

        if (_questionContainer.NumberOfQuestion <= 0)
            _questionContainer.AddQuestion('NoName', undefined);

        let expectIndex = _questionContainer.NumberOfQuestion - 1;
        let question = _questionContainer.GetQuestion(expectIndex);
        expect(question).toBeDefined();
    });

    test('Add Question (choice is undefined)', () => {
        let expectQuestionCount = _questionContainer.NumberOfQuestion + 1;
        let expectQuestionIndex = _questionContainer.NumberOfQuestion;
        let expectName = 'First Name';
        let expectChoices = [];
        let questionIndex = _questionContainer.AddQuestion(expectName, undefined);
        expect(_questionContainer.NumberOfQuestion).toBe(expectQuestionCount);
        expect(questionIndex).toBe(expectQuestionIndex);

        let question = _questionContainer.GetQuestion(questionIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
    });

    test('Add Question (choice is null)', () => {
        let expectQuestionCount = _questionContainer.NumberOfQuestion + 1;
        let expectQuestionIndex = _questionContainer.NumberOfQuestion;
        let expectName = 'First Name';
        let expectChoices = [];
        let questionIndex = _questionContainer.AddQuestion(expectName, null);
        expect(_questionContainer.NumberOfQuestion).toBe(expectQuestionCount);
        expect(questionIndex).toBe(expectQuestionIndex);

        let question = _questionContainer.GetQuestion(questionIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
    });

    test('Add Question (choice is empty)', () => {
        let expectQuestionCount = _questionContainer.NumberOfQuestion + 1;
        let expectQuestionIndex = _questionContainer.NumberOfQuestion;
        let expectName = 'First Name';
        let expectChoices = [];
        let questionIndex = _questionContainer.AddQuestion(expectName, []);
        expect(_questionContainer.NumberOfQuestion).toBe(expectQuestionCount);
        expect(questionIndex).toBe(expectQuestionIndex);

        let question = _questionContainer.GetQuestion(questionIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
    });

    test('Add Question with multiple choices', () => {
        let expectQuestionCount = _questionContainer.NumberOfQuestion + 1;
        let expectQuestionIndex = _questionContainer.NumberOfQuestion;
        let expectName = 'Title';
        let expectChoices = ['Mr', 'Ms', 'Mss'];
        let questionIndex = _questionContainer.AddQuestion(expectName, expectChoices);
        expect(_questionContainer.NumberOfQuestion).toBe(expectQuestionCount);
        expect(questionIndex).toBe(expectQuestionIndex);

        let question = _questionContainer.GetQuestion(questionIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
        for (i = 0; i < expectChoices.length; i++)
            expect(question.Choices[i]).toBe(expectChoices[i]);
    });

    test('Delete Question with existing index', () => {

        if (_questionContainer.NumberOfQuestion <= 0)
            _questionContainer.AddQuestion('NoName', undefined);

        let expectNumberOfQuestion = _questionContainer.NumberOfQuestion - 1;
        let deleteIndex = _questionContainer.NumberOfQuestion - 1;
        let isDelete = _questionContainer.DeleteQuestion(deleteIndex);
        expect(isDelete).toBeTruthy();
        expect(_questionContainer.NumberOfQuestion).toBe(expectNumberOfQuestion);

        let question = _questionContainer.GetQuestion(deleteIndex);
        expect(question).toBeUndefined();
    });

    test('Delete Question with out of range index', () => {
        let expectNumberOfQuestion = _questionContainer.NumberOfQuestion;
        let deleteIndex = _questionContainer.NumberOfQuestion;
        let isDelete = _questionContainer.DeleteQuestion(deleteIndex);
        expect(isDelete).toBeFalsy();
        expect(_questionContainer.NumberOfQuestion).toBe(expectNumberOfQuestion);
    });

    test('Update Question with out of range index', () => {
        let updateIndex = _questionContainer.NumberOfQuestion;
        let isUpdated = _questionContainer.UpdateQuestion(updateIndex, 'UpdateName', []);
        expect(isUpdated).toBeFalsy();
    });

    test('Update Question with existing index', () => {

        if (_questionContainer.NumberOfQuestion <= 0)
            _questionContainer.AddQuestion('NoName', undefined);

        let expectName = 'Update Name';
        let expectChoices = [];
        let updateIndex = _questionContainer.NumberOfQuestion - 1;
        let isUpdated = _questionContainer.UpdateQuestion(updateIndex, expectName, expectChoices);
        expect(isUpdated).toBeTruthy();

        let question = _questionContainer.GetQuestion(updateIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);

    });

    test('Update Question from no choice to multiple choices', () => {

        _questionContainer.AddQuestion('NoChoice', undefined);

        let expectName = 'NewChoice Name';
        let expectChoices = ['1', '2', '3'];
        let updateIndex = _questionContainer.NumberOfQuestion - 1;
        let isUpdated = _questionContainer.UpdateQuestion(updateIndex, expectName, expectChoices);
        expect(isUpdated).toBeTruthy();

        let question = _questionContainer.GetQuestion(updateIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
        for (i = 0; i < expectChoices.length; i++)
            expect(question.Choices[i]).toBe(expectChoices[i]);

    });


    test('Update Question from 5 choices to no choice', () => {

        _questionContainer.AddQuestion('5Choice', ['a', 'b', 'c', 'd', 'e']);

        let expectName = '3Choice';
        let expectChoices = [];
        let updateIndex = _questionContainer.NumberOfQuestion - 1;
        let isUpdated = _questionContainer.UpdateQuestion(updateIndex, expectName, expectChoices);
        expect(isUpdated).toBeTruthy();

        let question = _questionContainer.GetQuestion(updateIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);

    });

    test('Update Question from 5 choices to 3 choices', () => {

        _questionContainer.AddQuestion('5Choice', ['a', 'b', 'c', 'd', 'e']);

        let expectName = '3Choice';
        let expectChoices = ['1', '2', '3'];
        let updateIndex = _questionContainer.NumberOfQuestion - 1;
        let isUpdated = _questionContainer.UpdateQuestion(updateIndex, expectName, expectChoices);
        expect(isUpdated).toBeTruthy();

        let question = _questionContainer.GetQuestion(updateIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
        for (i = 0; i < expectChoices.length; i++)
            expect(question.Choices[i]).toBe(expectChoices[i]);

    });

    test('Update Question from 5 choices to 3 choices', () => {

        _questionContainer.AddQuestion('5Choice', ['a', 'b', 'c', 'd', 'e']);

        let expectName = '3Choice';
        let expectChoices = ['1', '2', '3'];
        let updateIndex = _questionContainer.NumberOfQuestion - 1;
        let isUpdated = _questionContainer.UpdateQuestion(updateIndex, expectName, expectChoices);
        expect(isUpdated).toBeTruthy();

        let question = _questionContainer.GetQuestion(updateIndex);
        expect(question).toBeDefined();
        expect(question.Name).toBe(expectName);
        expect(question.Choices).toBeDefined();
        expect(question.Choices.length).toBe(expectChoices.length);
        for (i = 0; i < expectChoices.length; i++)
            expect(question.Choices[i]).toBe(expectChoices[i]);

    });


    test('GetQuestionForBuildQuetionnaire', () => {

        _questionContainer.AddQuestion('5Choice', ['a', 'b', 'c', 'd', 'e']);

        let questions = _questionContainer.GetQuestionForBuildQuetionnaire();
        expect(questions).toBeDefined();
        expect(questions.length).toBe(_questionContainer.NumberOfQuestion);
        for (i = 0; i < questions.length; i++) {
            let sourceQuestion = _questionContainer.GetQuestion(i);
            let cloneQuestion = questions[i];
            expect(cloneQuestion).toBeDefined();
            expect(cloneQuestion.Name).toBe(sourceQuestion.Name);
            expect(cloneQuestion.Choices).toBeDefined();
            expect(cloneQuestion.Choices.length).toBe(sourceQuestion.Choices.length);
            for (choiceIndex = 0; choiceIndex < cloneQuestion.Choices.length; choiceIndex++)
                expect(cloneQuestion.Choices[choiceIndex]).toBe(sourceQuestion.Choices[choiceIndex]);
        }

    });

});