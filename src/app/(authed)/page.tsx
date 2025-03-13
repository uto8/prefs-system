import RevenuItem, { RevenuData } from '@/components/revenu/revenu-item';
import ApiGet from '@/lib/useApi/get';
//  import { useRouter } from "next/navigation";

export default async function Page() {

  const [
    issues_count,
    issue_confirms_count,
    total_contract_value,
    total_payment_check_value,
    total_revenu_value,
    total_order_check_value,
    total_profit_value,
    average_profit,
    own_total_order_check_value,
    total_order_plan_value,
    total_payment_plan_value
  ]: RevenuData[] = await Promise.all([
    ApiGet("/revenus/issues_count"),
    ApiGet("/revenus/issue_confirms_count"),
    ApiGet("/revenus/total_contract_value"),
    ApiGet("/revenus/total_payment_check_value"),
    ApiGet("/revenus/total_revenu_value"),
    ApiGet("/revenus/total_order_check_value"),
    ApiGet("/revenus/total_profit_value"),
    ApiGet("/revenus/average_profit"),
    ApiGet("/revenus/own_total_order_check_value"),
    ApiGet("/revenus/total_order_plan_value"),
    ApiGet("/revenus/total_payment_plan_value"),
  ])

  return (
    <div className="sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
         <div className="sm:flex-auto">
           <h1 className="text-base font-semibold text-gray-900">売上管理</h1>
         </div>
       </div>
       <div className="mt-8 flow-root">
         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={issues_count}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={issue_confirms_count}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_contract_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_payment_check_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_revenu_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_order_check_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_profit_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={average_profit}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={own_total_order_check_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_order_plan_value}/>
              </li>
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <RevenuItem data={total_payment_plan_value}/>
              </li>
            </ul>
         </div>
       </div>
    </div>
  )
}
