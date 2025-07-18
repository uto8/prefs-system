"use server";
import { getCookieSession } from "../auth/get-cookie-session";
import { Session } from "@/types/Session";

const ApiGet = async (url: string, reqHeader: Record<string, string> = {}) => {
  try{
    const request_url = process.env.NEXT_PUBLIC_API_BASE_URL + url;

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

    const response = await fetch(request_url, {
      method: 'GET',
      headers: header
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?? `取得に失敗しました`;
      throw Error(errorMessage);
    }

    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiGet;
