export class Question {
    ID: number;
    Equipment: number;
    Question: string;

    constructor(ID: number, Equipment: number, Question: string) {
        this.ID = ID;
        this.Equipment = Equipment;
        this.Question = Question;
    }
}