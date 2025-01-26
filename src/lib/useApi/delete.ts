const ApiDelete = async (url: string, reqHeader: Record<string, string> = {}) => {
  try{
    const header: HeadersInit = {
      "companyId": "1",
      ...reqHeader
    };
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + url;

    const response = await fetch(request_url, {
      method: 'DELETE',
      headers: header,
    });
    // ステータスコードを確認
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.json();
    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiDelete;
