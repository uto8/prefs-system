"use server"

import ApiGet from "@/lib/useApi/get";
import { Issue } from "@/types/Issue";

export const searchIssues = async ({
  id: id,
  client_name: clientName,
  type: type,
  sale_name: saleName,
  status: status,
}: {
  id: string | null;
  client_name: string | null;
  type: string | null;
  sale_name: string | null;
  status: string | null;
}):Promise<Issue[]> => {
  try{
    let url = '/issues?';
    if (id !== null) {
      url += `id=${id}&`;
    }
    if (clientName !== null) {
      url += `client_name=${clientName}&`;
    }
    if (type !== null) {
      url += `type=${type}&`;
    }
    if (saleName !== null) {
      url += `sale_name=${saleName}&`;
    }
    if (status !== null) {
      url += `status=${status}&`;
    }
    url = url.slice(0, -1);
    const issues = await ApiGet(url);
    return issues;
  }catch(e) {
    throw e;
  }
}
