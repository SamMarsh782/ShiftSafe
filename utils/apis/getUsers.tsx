export async function getUsers(): Promise<any> {
  const url = 'https://prod-42.westus.logic.azure.com:443/workflows/7cac6057abfe4cb89cfacb99677da246/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gs-89ZBYZemZI1tzT-ElAktWJySupKeQKn9pJeW4H4s';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API call successful:', response.status);
      return data;
    } else {
      console.error('API get user call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}