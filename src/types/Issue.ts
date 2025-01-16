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
  // sale: Sale;
}

export type ConfirmComplete = {
  date: string; 
}

// export type Sale = {
//   date: string;
//   amount: number;
// }

