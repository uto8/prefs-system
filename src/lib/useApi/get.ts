const ApiGet = async (url: string) => {
  try{
    const header: HeadersInit = {
      //Todo companyIdを変更
      "companyId": "1"
    };
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + url;
    console.log(request_url)

    const response = await fetch(request_url, {
      method: 'GET',
      headers: header,
    });

    const data = response.json();
    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiGet;
