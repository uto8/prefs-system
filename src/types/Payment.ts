export type Payment = {
  id: number;
  type: string;
  paymentPlanValue: string;
  paymentPlanDate: string;
  description: string;
  billingDate: Date;
  paymentChecks: PaymentCheck[];
}

export type PaymentCheck = {
  id: string;
  paymentId: number;
  paymentCheckValue: string;
  paymentCheckDate: string;
  description: string;
  createdAt: string;
}
