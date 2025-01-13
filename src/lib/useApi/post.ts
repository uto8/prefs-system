// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApiPost = async (url: string, body: object) => {
  try{
    const header: HeadersInit = {
      //Todo companyIdを変更
      "companyId": "1"
    };
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + url;
    console.log(request_url)

    const response = await fetch(request_url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body)
    });

    const data = response.json();
    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiPost;
