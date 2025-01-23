"use server";

import { signIn } from "@/auth";

export const loginWithCredentials = async({email, password}:{
  email: string;
  password: string;
}) => {
  try{
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    return response;
  }catch(e){
    throw e;
  }
}
