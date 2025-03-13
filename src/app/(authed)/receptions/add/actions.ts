"use server";

import { getCookieSession } from "@/lib/auth/get-cookie-session";
import ApiPost from "@/lib/useApi/post";
import { Session } from "@/types/Session";

export const createReception = async (body: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  officeId?: number | null
}) => {
  try{
    const cookie: Session = await getCookieSession()
    const reqBody = {
      ...(cookie.companyId && { "companyId": cookie.companyId }),
      ...(cookie.officeId && { "officeId": cookie.officeId }),
      ...body
    }
    console.log(reqBody)
    const sale = await ApiPost('/receptions', reqBody);
    return sale;
  }catch(e) {
    throw e;
  }
}
