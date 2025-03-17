export async function getEquipment(user: number): Promise<any> {
  const url = 'https://prod-23.westus.logic.azure.com:443/workflows/8e6a05c0873445a9b443db4600fe06f2/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3YxZUFStFeHly71-b5PI_M-wZNVSY7HS5F_rV7Yp0nQ';
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
      console.error('API get equipment call failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making API call:', error);
    return null;
  }
}