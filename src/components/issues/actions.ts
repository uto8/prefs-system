"use server"

import ApiGet from "@/lib/useApi/get";
import { Issue } from "@/types/Issue";

export const searchIssues = async ({
  id: id,
  client_name: clientName,
  start_preferred_date: startPreferredDate,
  end_preferred_date: endPreferredDate,
  type: type,
  low_budget: lowBudgetNumber,
  high_budget: highBudgetNumber,
  sale_name: saleName,
}: {
  id: string | null;
  client_name: string | null;
  start_preferred_date: string | null;
  end_preferred_date: string | null;
  type: string | null;
  low_budget: number | null;
  high_budget: number | null;
  sale_name: string | null;
}):Promise<Issue[]> => {
  try{
    let url = '/issues?';
    if (id !== null) {
      url += `id=${id}&`;
    }
    if (clientName !== null) {
      url += `client_name=${clientName}&`;
    }
    if (startPreferredDate !== null) {
      url += `start_preferred_date=${startPreferredDate}&`;
    }
    if (endPreferredDate !== null) {
      url += `end_preferred_date=${endPreferredDate}&`;
    }
    if (type !== null) {
      url += `type=${type}&`;
    }
    if (lowBudgetNumber !== null) {
      url += `low_budget=${lowBudgetNumber}&`;
    }
    if (highBudgetNumber !== null) {
      url += `high_budget=${highBudgetNumber}&`;
    }
    if (saleName !== null) {
      url += `sale_name=${saleName}&`;
    }
    url = url.slice(0, -1);
    const issues = await ApiGet(url);
    console.log("issues")
    console.log(issues);
    return issues;
  }catch(e) {
    throw e;
  }
}
