export type Order = {
    id: string;
    supplier: string;
    order_plan_value: string;
    withdrawal_plan_date: string;
    type: string;
    description: string;
    orderCheck: OrderCheck;
  }
  
  export type OrderCheck = {
    id: string;
    order_id: string;
    order_check_value: string;
    order_check_date: string;
  }