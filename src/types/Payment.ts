export type Payment = {
  id: string;
  type: string;
  payment_plan_value: string;
  payment_plan_date: string;
  description: string;
  paymentCheck: PaymentCheck;
}

export type PaymentCheck = {
  id: string;
  payment_id: string;
  payment_check_value: string;
  payment_check_date: string;
  description: string;
}