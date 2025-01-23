export type Order = {
  id: string;
  supplier: string;
  order_plan_value: number;  // 数値に変更
  withdrawal_plan_date: string;  // 日付文字列で保持
  type: string;
  description: string;
  orderChecks: OrderCheck[];  // 複数の OrderCheck を持つ場合、配列に変更
};

export type OrderCheck = {
  id: string;
  order_id: string;
  order_check_value: number;  // 数値に変更
  order_check_date: string;  // 日付文字列で保持
  description: string;
  created_at: string;  // 日付文字列で保持
};
