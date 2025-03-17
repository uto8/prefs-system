import { Office } from "./Office";
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
  finishDate: string | null;
}

export type Issue = {
  id: number;
  officeId: number;
  saleId: number;
  clientId: number;
  companyId: number;
  currentAddress: string;
  preferredDate: string;
  type: string;
  contactContent: string;
  budget: string;
  constructionSite: string;
  createdAt: string;
  updatedAt: string;
  sale: Sale;
  client: Client;
  issueConfirmed: IssueConfirmed;
  memo: string;
  issueCode: string
  status: string;
  office: Office;
  isFranchise: boolean;
  datetime: string;
}
