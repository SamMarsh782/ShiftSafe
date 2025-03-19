export class Equipment {
    ID: number | null;
    Name: string | null;
    Type: string | null;
    Warehouse: number | null;

    constructor(ID: number, Name: string, Type: string, Warehouse: number | null = null) {
        this.ID = ID;
        this.Name = Name;
        this.Type = Type;
        this.Warehouse = Warehouse;
    }
}