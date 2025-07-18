export type IssueRequest = {
  id: number;
  issueId: number;
  status: string;
  officeName: string;
  saleName: string;
  rejectReason: string | null;
}
