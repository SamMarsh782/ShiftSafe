export class User {
    ID: number | null;
    First_Name: string | null;
    Last_Name: string | null;
    Shift: string | null;
    Check_Digit: number | null;

    constructor(ID: number, First_Name: string, Last_Name: string, Shift: string, Check_Digit: number) {
        this.ID = ID;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Shift = Shift;
        this.Check_Digit = Check_Digit;
    }
}