"use server"

import ApiGet from "@/lib/useApi/get";

export const searchIssues = async ({
  client_name: clientName,
  type: type,
  sale_id: saleId,
  office_id: officeId,
  status: status,
  issueCode: issueCode,
  offset,
  createdAtFrom,
  createdAtTo,
}: {
  client_name: string | null;
  type: string | null;
  sale_id: string | null;
  office_id: string | null;
  status: string | null;
  issueCode: string | null;
  offset: number;
  createdAtFrom: string | null;
  createdAtTo: string | null;
}) => {
  try{
    let url = '/issues?';
    if (clientName !== null) {
      url += `client_name=${clientName}&`;
    }
    if (type !== null) {
      url += `type=${type}&`;
    }
    // if (saleName !== null) {
    //   url += `sale_name=${saleName}&`;
    // }
    // if (officeName !== null) {
    //   url += `office_name=${officeName}&`;
    // }
    if (status !== null) {
      url += `status=${status}&`;
    }
    if (issueCode !== null) {
      url += `issue_code=${issueCode}&`;
    }
    if (createdAtFrom !== null) {
      url += `created_at_from=${createdAtFrom}&`;
    }
    if (createdAtTo !== null) {
      url += `created_at_to=${createdAtTo}&`;
    }
    url += `limit=20&offset=${offset}`
    let header = {}
    if(officeId){
      header = {...header, officeId: officeId}
    }
    if(saleId){
      header = {...header, saleId: saleId}
    }
    const issues = await ApiGet(url, header);
    return issues;
  }catch(e) {
    throw e;
  }
}
