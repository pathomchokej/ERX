class QuestionnaireResult {
    Result = undefined;
    Data = undefined;

    constructor(result, data) {
        this.Result = result;
        this.Data = data;
    }
}

module.exports = {
    QuestionnaireResult: QuestionnaireResult
}