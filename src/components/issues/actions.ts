"use server"

import ApiGet from "@/lib/useApi/get";

export const searchIssues = async ({
  client_name: clientName,
  type: type,
  sale_name: saleName,
  office_name: officeName,
  status: status,
  issueCode: issueCode,
  offset,
  createdAtFrom,
  createdAtTo
}: {
  client_name: string | null;
  type: string | null;
  sale_name: string | null;
  office_name: string | null;
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
    if (saleName !== null) {
      url += `sale_name=${saleName}&`;
    }
    if (officeName !== null) {
      url += `office_name=${officeName}&`;
    }
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
    const issues = await ApiGet(url);
    return issues;
  }catch(e) {
    throw e;
  }
}
