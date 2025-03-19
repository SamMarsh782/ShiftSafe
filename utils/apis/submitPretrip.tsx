import { Answer } from '@/types/answer';

export async function submitPretrip(answers: any[]): Promise<any> {
  const url = 'https://prod-70.westus.logic.azure.com:443/workflows/1eb5e298d1b34b168c9d06c7fcff8d28/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MupkcmK4M5IHqWDotOrOv7zdNFwQJEovpyg9txPfGr8';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API call successful:', response.status);
      return data;
    } else {
      console.error('API submit pretrip call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}