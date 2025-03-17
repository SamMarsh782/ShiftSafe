export async function getEquipByID(equip: number): Promise<any> {
  const url = 'https://prod-25.westus.logic.azure.com:443/workflows/773a977efd0b4b02a89e82e7841a572d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FuDNCEGSIxNXkCWSGxzpmDe6DDHGLBgq25guFyqVpRM';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Asset": equip }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API call successful:', response.status);
      return data;
    } else {
      console.error('API get equip by id call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}