export async function getQuestions(equip: number): Promise<any> {
  const url = 'https://prod-71.westus.logic.azure.com:443/workflows/329632e5ffc34bd0b9593e9c280d0d69/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9UrF2jK80gZjdKAJ0wmGzRt_p1qoem68alezUZ5BVHA';
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
      console.error('API get questions call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}