"use server";

import ApiGet from "@/lib/useApi/get";
import ApiPut from "@/lib/useApi/put";
import { Sale } from "@/types/Sale";

export const getSaleById = async (id: string): Promise<Sale> => {
  try{
    const response = await ApiGet(`/sales/${id}`)
    console.log(response)
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      phoneNumber: response.phoneNumber,
    }
  }catch(e) {
    throw e;
  }
}

export const editSale = async ({id: id, sale: sale}:{
  id: string,
  sale: {
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
  }
}): Promise<Sale> => {
  try{
    const response = await ApiPut(`/sales/${id}`, sale)
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
