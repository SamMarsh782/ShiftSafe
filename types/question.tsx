export class Question {
    ID: number | null;
    Asset_ID: number | null;
    Question: string | null;
    Check_String: string | null;

    constructor(ID: number, Asset_ID: number, Question: string, Check_String: string) {
        this.ID = ID;
        this.Asset_ID = Asset_ID;
        this.Question = Question;
        this.Check_String = Check_String;
    }
}