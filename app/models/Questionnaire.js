class Questionnaire {

    #_questions = [];
    #_answers = [];

    get NumberOfQuestion() {
        return this.#_questions.length;
    }

    get NumberOfAnswer() {
        return this, this.#_answers.length;
    }

    constructor(questions) {
        let validateQuestions = (questions != null && questions != undefined) ? [...questions] : [];
        this.#_questions = validateQuestions;
        for (let i = 0; i < this.NumberOfQuestion; i++) {
            this.#_answers[i] = undefined;
        }
    }

    GetQuestion(index) {
        return (index >= 0 && index < this.NumberOfQuestion) ? this.#_questions[index] : undefined;
    }

    SetAnswer(index, ans) {
        if (index < 0 || index >= this.NumberOfQuestion)
            return false;

        this.#_answers[index] = ans;
        return true;
    }

    GetAnswer(index) {
        return (index >= 0 && index < this.NumberOfAnswer) ? this.#_answers[index] : undefined;
    }

    GetCsvData() {
        let csvInfo = ''
        for (let i = 0; i < this.NumberOfQuestion; i++) {
            csvInfo += this.#_questions[i].Name + ',';
            if (this.#_answers[i] != undefined && this.#_answers[i] != null)
                csvInfo += this.#_answers[i];
            csvInfo += '\n';
        }
        return csvInfo;
    }
}

module.exports = {
    Questionnaire: Questionnaire
}