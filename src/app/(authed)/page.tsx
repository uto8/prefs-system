import RevenuItem, { RevenuData } from "@/components/revenu/revenu-item"
import ApiGet from "@/lib/useApi/get"

export default async function Page() {
  const revenus = await ApiGet("/revenus")
  console.log(revenus)

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
              {
                revenus.map((revenu: RevenuData, index: number) => {
                  return <li key={index} className="overflow-hidden rounded-xl border border-gray-200">
                    <RevenuItem data={revenu}/>
                  </li>
                })
              }
            </ul>
         </div>
       </div>
    </div>
  )
}
