"use server";

import { signIn } from "@/auth";

export const loginWithCredentials = async({email, password}:{
  email: string;
  password: string;
}) => {
  try{
    console.log('email');
    console.log(email);
    console.log("password")
    console.log(password)
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    console.log("login with credential")
    return response;
  }catch(e){
    throw e;
  }
}
