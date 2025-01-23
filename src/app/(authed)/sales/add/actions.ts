"use server";

import ApiPost from "@/lib/useApi/post";

export const createSale = async (body: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  companyId: number;
  officeId: number
}) => {
  try{
    const sale = await ApiPost('/sales', body);
    return sale;
  }catch(e) {
    throw e;
  }
}
