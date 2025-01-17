export type Issue = {
  id: string;
  officeId: string;
  clientId: string;
  currentAddress: string;
  preferredDate: string;
  type: string;
  contactContent: string;
  budget: string;
  constructionSite: string;
  confirmComplete: ConfirmComplete;

}

export type ConfirmComplete = {
  id: string,
  issueId: string,
  confirmDate: string,
  startDate: string,
  completeDate: string,
  contractValue: string,

}


