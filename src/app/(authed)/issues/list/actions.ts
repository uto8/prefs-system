"use server";

import ApiGet from "@/lib/useApi/get";
import ApiPost from "@/lib/useApi/post";
import ApiPut from "@/lib/useApi/put";
import { Issue, IssueConfirmed } from "@/types/Issue";

export const getIssues = async ():Promise<Issue[]> => {
  try{
    const issues = await ApiGet('/issues');
    return issues;
  }catch(e) {
    throw e;
  }
}
export const createIssueConfirmed = async (body: {
  issueId: number,
  confirmDate: string;
  startDate: string;
  completeDate: string;
  contractValue: string;
}):Promise<IssueConfirmed> => {
  try{
    const issueConfirmed = await ApiPost('/issue_confirmed', {
      issueId: body.issueId,
      confirmDate: body.confirmDate,
      startDate: body.startDate,
      completeDate: body.completeDate,
      contractValue: Number(body.contractValue) ?? 0,
    })
    return {
      id: issueConfirmed.id,
      confirmDate: issueConfirmed.confirmDate,
      startDate: issueConfirmed.startDate,
      completeDate: issueConfirmed.completeDate,
      contractValue: issueConfirmed.contractValue,
    }
  }catch(e) {
    throw e;
  }
}

export const updateIssueConfirmed = async ({id: id, body: body}: {
  id: number,
  body: {
    confirmDate: Date;
    startDate: Date;
    completeDate: Date;
    contractValue: number;
  }
}):Promise<IssueConfirmed> => {
  try{
    const issueConfirmed = await ApiPut(`/issue_confirmed/${id}`, body)
    return {
      id: issueConfirmed.id,
      confirmDate: issueConfirmed.confirmDate,
      startDate: issueConfirmed.startDate,
      completeDate: issueConfirmed.completeDate,
      contractValue: issueConfirmed.contractValue,
    }
  }catch(e) {
    throw e;
  }
}
