"use server"

import { Session } from "@/types/Session";
import { getCookieSession } from "../auth/get-cookie-session";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ApiPost = async (url: string, body: object, reqHeader: Record<string, string> = {}) => {
  try{
    const cookie: Session = await getCookieSession()
    const header: HeadersInit = {
      ...(cookie.role && { "role": cookie.role }),
      ...(cookie.companyId && { "companyId": cookie.companyId }),
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...(cookie.saleId && { "saleId": cookie.saleId }),
      ...(cookie.receptionId && { "receptionId": cookie.receptionId }),
      ...(cookie.userId && { "userId": cookie.userId }),
      ...reqHeader
    };
    // process.env.NEXT_PUBLIC_API_BASE_URL
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + url;
    const reqBody = {
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...(cookie.saleId && { "saleId": cookie.saleId }),
      ...(cookie.receptionId && { "receptionId": cookie.receptionId }),
      ...body
    }

    const response = await fetch(request_url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(reqBody)
    });

    const data = await response.json();
    console.log("====data", data)

    // ステータスコードを確認
    if (!response.ok) {
      const errorMessage = data.error?? `作成に失敗しました`;
      throw Error(errorMessage);
    }

    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiPost;
