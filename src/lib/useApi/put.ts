// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApiPut = async (url: string, body: object) => {
  const header = {
    //Todo companyIdを変更
    "companyId": "1"
  };
  const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + url;

  try {
    const response = await fetch(request_url, {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(body)
    });

    if (!response) {
      throw new Error('Network response was not ok.');
    }

    const data = await response;
    return data;
  } catch (error) {
    throw error;
  }
};

export default ApiPut;
