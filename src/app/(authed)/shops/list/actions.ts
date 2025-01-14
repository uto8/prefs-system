"use server"

import ApiGet from "@/lib/useApi/get"

export const getOffices = async () => {
  try{
    const offices = await ApiGet('/offices');
    return offices;
  }catch(e) {
    throw e;
  }
}
