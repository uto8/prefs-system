"use server"

import ApiGet from "@/lib/useApi/get";
import { Issue } from "@/types/Issue";

export const searchIssues = async ({
  client_name: clientName,
  type: type,
  sale_name: saleName,
  office_name: officeName,
  status: status,
  issueCode: issueCode
}: {
  client_name: string | null;
  type: string | null;
  sale_name: string | null;
  office_name: string | null;
  status: string | null;
  issueCode: string | null;
}):Promise<Issue[]> => {
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
    url = url.slice(0, -1);
    const issues = await ApiGet(url);
    return issues;
  }catch(e) {
    throw e;
  }
}
