"use server"

import { auth } from "@/auth";
import ApiPost from "@/lib/useApi/post";

export const createIssue = async (body: {
  currentAddress: string;
  officeId: number,
  preferredDate: string;
  type: string;
  contactContent: string;
  budget: string;
  saleId: number;
  constructionSite: string;
  clientName: string;
  clientNameKana: string;
  clientEmail: string;
  clientPhoneNumber: string;
  isFranchise: number;
}) => {
  try{
    const session = await auth()
    console.log(session)
    const bodyReq = {
      ...body
    }
    if(session?.user.officeId){
      bodyReq.officeId = session.user.officeId
    }
    if(session?.user.saleId){
      bodyReq.saleId = session.user.saleId
    }
    const res = await ApiPost('/issues' ,bodyReq)
    console.log("==res", res)
  }catch(e) {
    console.log("==E", e)
    throw e;
  }
}
