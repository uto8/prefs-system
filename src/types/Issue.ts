import { Sale } from "./Sale";

export type Client = {
  id: number;
  name: string;
  nameKana: string;
  email: string;
  phoneNumber: string;
}

export type IssueConfirmed = {
  id: number | null;
  confirmDate: string | null;
  startDate: string | null;
  completeDate: string | null;
  contractValue: string | null;
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
  issueConfirmed: IssueConfirmed;
  memo: string;
}
