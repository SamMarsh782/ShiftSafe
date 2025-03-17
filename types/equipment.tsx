export class Equipment {
    ID: number | null;
    Name: string | null;
    Type: string | null;

    constructor(ID: number, Name: string, Type: string) {
        this.ID = ID;
        this.Name = Name;
        this.Type = Type;
    }
}