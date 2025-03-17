export async function getDevice(deviceName: string): Promise<any> {
    const url = 'https://prod-70.westus.logic.azure.com:443/workflows/490505e2e131495dbb916d14d04b61d0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Llxii-wJdBK6jai-AxpXgj9QPFxdEoZ_O0WxdiRrJxk';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "Device": deviceName }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('API call successful:', response.status);
        return data;
      } else {
        console.error('API get device call failed:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error making API call:', error);
      return null;
    }
  }