export async function getUserByID(user: number): Promise<any> {
    const url = 'https://prod-178.westus.logic.azure.com:443/workflows/6f363cb5d6b7493995eae5c77456678a/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XkArCrH7XyDg2-ZgvtORCC25AMnAHxQvV1QnalHF9Ro';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "User": user }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('API call successful:', response.status);
        return data;
      } else {
        console.error('API get user by id call failed:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error making API call:', error);
      return null;
    }
  }