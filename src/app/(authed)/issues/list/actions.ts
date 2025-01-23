"use server";

import ApiGet from "@/lib/useApi/get";
import { Issue } from "@/types/Issue";

export const getIssues = async ():Promise<Issue[]> => {
  try{
    const issues = await ApiGet('/issues');
    return issues;
  }catch(e) {
    throw e;
  }
}
