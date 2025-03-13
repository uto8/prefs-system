"use server";

import ApiGet from "@/lib/useApi/get";
import ApiPut from "@/lib/useApi/put";
import { Reception } from "@/types/Reception";

export const getReceptionById = async (id: string): Promise<Reception> => {
  try{
    const response = await ApiGet(`/receptions/${id}`)
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      phoneNumber: response.phoneNumber,
      officeName: response.officeName,
      officeId: response.officeId,
    }
  }catch(e) {
    throw e;
  }
}

export const editReception = async ({id: id, reception: reception}:{
  id: string,
  reception: {
    name: string,
    email: string,
    phoneNumber: string,
    officeId: string
  }
}): Promise<Reception> => {
  try{
    const response = await ApiPut(`/receptions/${id}`, reception)
    console.log(response)
    // Todo レスポンスの修正
    return {
      id: id,
      name: "response.name",
      email: "string",
      phoneNumber: "string",
      officeName: "",
      officeId: 0
    }
  }catch(e) {
    throw e;
  }
}
