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
      ...reqHeader
    };

    const response = await fetch(request_url, {
      method: 'GET',
      headers: header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.json();
    return data;
  }catch(e) {
    throw e;
  }
};

export default ApiGet;
