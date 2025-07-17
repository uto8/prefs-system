"use server"

import { cookies } from 'next/headers'

export const setCookieSession = async ({
  role:role,
  companyId: companyId,
  officeId: officeId,
  saleId: saleId,
  receptionId: receptionId,
  userId: userId,
  idToken: idToken
}: {
  role:string,
  companyId: string,
  officeId: string,
  saleId: string,
  receptionId: string,
  userId: string,
  idToken: string
}) => {
  const useCookie = await cookies()
  const cookieOptions = { maxAge: 315360000, secure: true }

  useCookie.set('name', 'lee', cookieOptions)
  useCookie.set("role", role, cookieOptions)
  useCookie.set("companyId", companyId, cookieOptions)
  useCookie.set("officeId", officeId, cookieOptions)
  useCookie.set("saleId", saleId, cookieOptions)
  useCookie.set("receptionId", receptionId, cookieOptions)
  useCookie.set("userId", userId, cookieOptions)
  useCookie.set("idToken", idToken, cookieOptions)
}
