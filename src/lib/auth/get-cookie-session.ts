import { cookies } from "next/headers";
import { Session } from "@/types/Session";

export const getCookieSession = async (): Promise<Session> => {
  // const token = (await cookies()).get(
  //   process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY_NAME ?? ""
  // )?.value;

  const cookieStore = await cookies()
  const role = cookieStore.get('role')
  const companyId = cookieStore.get('companyId')
  const officeId = cookieStore.get('officeId')
  const saleId = cookieStore.get('saleId')

  const session = {
    role: role?.value ?? null,
    companyId: companyId?.value ?? null,
    officeId: officeId?.value ?? null,
    saleId: saleId?.value ?? null,
    idToken: ""
  }

  return session;
};
