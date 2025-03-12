export async function getDeviceUser(Device:string): Promise<number | null> {
    if(Device == `Samuel's A52`) {
        return 11111;
    } else {
        return null;
    }
}