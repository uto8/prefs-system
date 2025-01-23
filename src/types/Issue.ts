import { Sale } from "./Sale";

interface Client {
  id: number;
  name: string;
  nameKana: string;
  email: string;
  phoneNumber: string;
}

interface IssueConfirmed {
  id: number | null;
  issueId: number | null;
  confirmDate: string | null;
  startDate: string | null;
  completeDate: string | null;
  contractValue: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type Issue = {
  id: number;
  officeId: number;
  clientId: number;
  companyId: number;
  currentAddress: string;
  preferredDate: string;
  type: string;
  contactContent: string;
  budget: number;
  constructionSite: string;
  createdAt: string;
  updatedAt: string;
  sale: Sale;
  client: Client;
  issue_confirmed: IssueConfirmed;
}
