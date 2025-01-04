'use server'

import { cookies } from "next/headers"

export const setCookie = async (value: string) => {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', value)
}

