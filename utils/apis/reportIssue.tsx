export async function reportIssue(imageData: string, description: string, user: number | null, equipment: number | null, wrhs: number | null): Promise<any> {
  const url = 'https://prod-11.westus.logic.azure.com:443/workflows/f63952a838b74a63ba206bd221da3948/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kAC-gkOS_fXr4votRCsOJZV1SlaIpTwAI4tzS8Lsdpg';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData, Description: description, User: user, Equipment: equipment, Warehouse: wrhs }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('API call successful:', response.status);
      return data;
    } else {
      console.error('API report issue call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}