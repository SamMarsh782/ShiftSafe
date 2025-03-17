export class Device {
    ID: number | null;
    Device_Name: string | null;
    Last_User: number | null;
    Latitude: number | null;
    Longitude: number | null;
    Owner: number | null;
    Mount: number | null;


    constructor(ID: number, Device_Name: string, Last_User: number, Latitude: number, Longitude: number, Owner: number, Mount: number) {
        this.ID = ID;
        this.Device_Name = Device_Name;
        this.Last_User = Last_User;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Owner = Owner;
        this.Mount = Mount;
    }
}      