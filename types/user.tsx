export class User {
    ID: number | null;
    Name: string | null;
    Shift: string | null;
    Check_Digit: number | null;

    constructor(ID: number, Name: string, Shift: string, Check_Digit: number) {
        this.ID = ID;
        this.Name = Name;
        this.Shift = Shift;
        this.Check_Digit = Check_Digit;
    }
}