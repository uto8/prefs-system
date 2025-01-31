export type Repair = {
  id: number;
  supplier: string;
  repairPlanValue: number;  // 数値に変更
  withdrawalPlanDate: Date;  // 日付文字列で保持
  type: string;
  description: string;
  repairChecks: RepairCheck[];  // 複数の OrderCheck を持つ場合、配列に変更
};

export type RepairCheck = {
  id: string;
  repairId: number;
  repairCheckValue: number;  // 数値に変更
  repairCheckDate: Date;  // 日付文字列で保持
  description: string;
  createdAt: string;  // 日付文字列で保持
};

