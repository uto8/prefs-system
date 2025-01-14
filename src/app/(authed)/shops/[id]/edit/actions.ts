"use server";

import ApiGet from "@/lib/useApi/get";
import ApiPut from "@/lib/useApi/put";
import { Office } from "@/types/Office";

export const getOffice = async (id: string): Promise<Office> => {
  try{
    const response = await ApiGet(`/offices/${id}`)
    console.log(response)
    return {
      id: response.id,
      name: "response.name",
      email: "string",
      phoneNumber: "string",
    }
  }catch(e) {
    throw e;
  }
}

export const editOffice = async ({id: id, office: office}:{
  id: string,
  office: {
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
  }
}): Promise<Office> => {
  try{
    const response = await ApiPut(`/offices/${id}`, office)
    console.log(response)
    return {
      id: id,
      name: "response.name",
      email: "string",
      phoneNumber: "string",
    }
  }catch(e) {
    throw e;
  }
}
