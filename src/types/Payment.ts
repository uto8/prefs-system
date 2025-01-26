export type Payment = {
  id: number;
  type: string;
  paymentPlanValue: string;
  paymentPlanDate: string;
  description: string;
  paymentChecks: PaymentCheck[];
}

export type PaymentCheck = {
  id: string;
  paymentId: string;
  paymentCheckValue: string;
  paymentCheckDate: string;
  description: string;
  createdAt: string;
}
