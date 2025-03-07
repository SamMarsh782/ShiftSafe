export async function getObject(): Promise<any> {
  const url = 'https://prod-82.westus.logic.azure.com:443/workflows/185d68a59653412080a5bb8aee065cd0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TluT6PMKxNzwLkkt0UzX6sCxoqq8FIXuLnZ0vgsCsT8';

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
      console.error('API call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}