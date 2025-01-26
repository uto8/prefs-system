"use server";

import { signIn } from "@/auth";

export const loginWithCredentials = async({email, password}:{
  email: string;
  password: string;
}) => {
  try{
    console.log("response==============")
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    console.log("response")
    console.log(response);
    return response;
  }catch(e){
    console.log(e);
    throw e;
  }
}
