// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApiPost = async (url: string, body: object) => {
  try{
    const header: HeadersInit = {
      //Todo companyIdを変更
      "companyId": "1",

    };
    // process.env.NEXT_PUBLIC_API_BASE_URL
    const request_url = "https://jatkbfh4l4.execute-api.ap-northeast-1.amazonaws.com/prod" + url;
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
