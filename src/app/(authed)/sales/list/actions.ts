"use server";

import ApiGet from "@/lib/useApi/get";

export const getSales = async () => {
  const response = await ApiGet('/sales');
  return response;
}

export const getOffices = async () => {
  const response = await ApiGet('/offices');
  return response;
}

export const deleteSale = async (id: string) => {
  const response = await ApiGet(`/sales/${id}`);
  return response;
}
