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
      name: "response.name",
      email: "string",
      phoneNumber: "string",
    }
  }catch(e) {
    throw e;
  }
}

export const updateSale = async (body: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  companyId: number;
}) => {
  const sale = await ApiPut('/sales', body);
  return sale;
}
