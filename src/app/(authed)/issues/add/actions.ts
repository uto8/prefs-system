"use server"

import { auth } from "@/auth";
import ApiPost from "@/lib/useApi/post";

export const createIssue = async (body: {
  issueCode: string;
  currentAddress: string;
  officeId: number | null,
  preferredDate: string;
  type: string;
  contactContent: string;
  budget: string;
  saleId: number | null;
  constructionSite: string;
  clientName: string;
  clientNameKana: string;
  clientEmail: string;
  clientPhoneNumber: string;
  isFranchise: number;
  receptionId: number | null;
  status: string | null;
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
    console.log("===receptionid", body.receptionId)
    const res = await ApiPost('/issues' ,bodyReq)
    console.log(res);
  }catch(e) {
    throw e;
  }
}
