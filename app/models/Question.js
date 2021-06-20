class Question {
    #_name = undefined;
    #_choices = [];

    get Name() {
        return this.#_name;
    }

    get Choices() {
        return this.#_choices;
    }

    constructor(name, choices) {
        this.SetName(name);
        this.SetChoices(choices);
    }

    SetName(newName){
        this.#_name = newName;        
    }

    SetChoices(newChoices){
        let choices = (newChoices != null && newChoices != undefined) ? [...newChoices] : [];
        this.#_choices = choices;
    }

    Clone(){
        return new Question(this.#_name, this.#_choices);
    }
}

module.exports = {
    Question: Question
}