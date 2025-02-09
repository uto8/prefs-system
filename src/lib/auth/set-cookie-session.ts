"use server"

import { cookies } from 'next/headers'

export const setCookieSession = async ({
  role:role,
  companyId: companyId,
  officeId: officeId,
  saleId: saleId,
  idToken: idToken
}: {
  role:string,
  companyId: string,
  officeId: string,
  saleId: string,
  idToken: string
}) => {
  const useCookie = await cookies()
  useCookie.set('name', 'lee', { secure: true })
  useCookie.set("role", role)
  useCookie.set("companyId", companyId)
  useCookie.set("officeId", officeId)
  useCookie.set("saleId", saleId)
  useCookie.set("idToken", idToken)
}
