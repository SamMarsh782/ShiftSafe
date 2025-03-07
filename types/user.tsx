export class User {
    ID: number;
    User: string;
    Check_Digit: number;

    constructor(ID: number, User: string, Check_Digit: number) {
        this.ID = ID;
        this.User = User;
        this.Check_Digit = Check_Digit;
    }
}