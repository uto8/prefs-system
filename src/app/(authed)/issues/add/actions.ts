"use server"

import ApiPost from "@/lib/useApi/post";

export const createIssue = async (body: {
  currentAddress: string;
  officeId: number,
  preferredDate: string;
  type: string;
  contactContent: string;
  budget: number;
  saleId: number;
  constructionSite: string;
  clientName: string;
  clientNameKana: string;
  clientEmail: string;
  clientPhoneNumber: string;
}) => {
  try{
    await ApiPost('/issues' ,body)
  }catch(e) {
    throw e;
  }
}
