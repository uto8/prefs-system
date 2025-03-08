"use server";

import ApiGet from "@/lib/useApi/get";
import ApiPut from "@/lib/useApi/put";
import { Office } from "@/types/Office";

export const getOffice = async (id: string): Promise<Office> => {
  try{
    const response = await ApiGet(`/offices/${id}`)
    return {
      id: response.id,
      name: response.name,
      officeCode: response.officeCode,
      email: response.email,
      phoneNumber: response.phoneNumber,
      companyId: 1,
      isFranchise: response.isFranchise
    }
  }catch(e) {
    throw e;
  }
}

export const editOffice = async ({
  id,
  office
}:{
  id: string,
  office: {
    name: string,
    officeCode: string,
    email: string,
    phoneNumber: string,
    isFranchise: boolean
  }
}): Promise<Office> => {
  try{
    const response = await ApiPut(`/offices/${id}`, office)
    console.log(response)
    return {
      id: id,
      name: office.name,
      officeCode: office.officeCode,
      email: office.email,
      phoneNumber: office.phoneNumber,
      companyId: 1,
      isFranchise: office.isFranchise
    }
  }catch(e) {
    throw e;
  }
}
