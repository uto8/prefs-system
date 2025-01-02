// 補修予定の型定義
export interface Repair {
    id: string;
    supplier: string;               
    repair_plan_value: number;      
    withdrawal_plan_date: string;  
    type: string;                  
    description?: string;           
    created_at: string;            
    updated_at: string;           
  }
  
  // 補修確認の型定義
  export interface RepairCheck {
    id: string;
    repair_id: string;             
    repair_check_value: number;    
    repair_check_date: string;     
    description?: string;         
    created_at: string;           
  }
  
  