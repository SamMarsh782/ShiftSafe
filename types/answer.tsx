export class Answer {
    ID: number | null;
    Pretrip_ID: number | null;
    User_ID: number | null;
    Asset_ID: number | null;
    Question_ID: number | null;
    Answer: string | null;
    Time_Submitted: string | null;

    constructor(ID: number, Pretrip_ID: number, User_ID: number, Asset_ID: number, Question_ID: number, Answer: string, Time_Submitted: string) {
        this.ID = ID;
        this.Pretrip_ID = Pretrip_ID;
        this.User_ID = User_ID;
        this.Asset_ID = Asset_ID;
        this.Question_ID = Question_ID;
        this.Answer = Answer;
        this.Time_Submitted = Time_Submitted;
    }
}