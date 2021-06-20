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
        this.#_choices = newChoices;
    }
}

module.exports = {
    Question: Question
}