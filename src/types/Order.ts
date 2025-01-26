export type Order = {
  id: number;
  supplier: string;
  orderPlanValue: number;  // 数値に変更
  withdrawalPlanDate: Date;  // 日付文字列で保持
  type: string;
  description: string;
  orderChecks: OrderCheck[];  // 複数の OrderCheck を持つ場合、配列に変更
};

export type OrderCheck = {
  id: string;
  orderId: number;
  orderCheckValue: number;  // 数値に変更
  orderCheckDate: Date;  // 日付文字列で保持
  description: string;
  createdAt: string;  // 日付文字列で保持
};
