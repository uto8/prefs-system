"use server";

import ApiGet from "@/lib/useApi/get";

export const getSales = async () => {
  const response = await ApiGet('/sales');
  console.log('response');
  console.log(response)
  return response;
}

export const getOffices = async () => {
  const response = await ApiGet('/offices');
  console.log(response)
  return response;
}
