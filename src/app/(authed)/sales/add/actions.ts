"use server";

import ApiGet from "@/lib/useApi/get";
import ApiPost from "@/lib/useApi/post";

export const createSale = async (body: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  companyId: number;
}) => {
  const sale = await ApiPost('/sales', body);
  return sale;
}
