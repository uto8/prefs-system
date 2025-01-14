"use server";

import ApiPost from "@/lib/useApi/post";

export const createOffice = async (body: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  companyId: number;
}) => {
  const office = await ApiPost('/offices', body);
  return office;
}
