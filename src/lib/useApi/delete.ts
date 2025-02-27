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

    const data = await response.json();

    // ステータスコードを確認
    if (!response.ok) {
      const errorMessage = data.error?? `削除に失敗しました`;
      throw Error(errorMessage);
    }

    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiDelete;
