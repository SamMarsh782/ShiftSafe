export async function getWarehouseByID(warehouse: number): Promise<any> {
    const url = 'https://prod-113.westus.logic.azure.com:443/workflows/acf42c93dd8646cc866607999ccee53c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xyjHYwG6H9W1k8KpKDvKuop9a5gIMi7vdpyYYCPYLlM';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "Warehouse": warehouse }),
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