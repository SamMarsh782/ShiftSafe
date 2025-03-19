export class Warehouse {
    ID: number | null;
    Name: string | null;
    lightPrimary: string | null;
    darkPrimary: string | null;
    lightSecondary: string | null;
    darkSecondary: string | null;
    lightTertiary: string | null;
    darkTertiary: string | null;
    lightQuaternary: string | null;
    darkQuaternary: string | null;

    constructor(ID: number, Name: string, lightPrimary: string, darkPrimary: string, lightSecondary: string, darkSecondary: string, lightTertiary: string, darkTertiary: string, lightQuaternary: string, darkQuaternary: string) {
        this.ID = ID;
        this.Name = Name;
        this.lightPrimary = lightPrimary;
        this.darkPrimary = darkPrimary;
        this.lightSecondary = lightSecondary;
        this.darkSecondary = darkSecondary;
        this.lightTertiary = lightTertiary;
        this.darkTertiary = darkTertiary;
        this.lightQuaternary = lightQuaternary;
        this.darkQuaternary = darkQuaternary;
    }
}
  
  
  