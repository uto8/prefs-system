import RevenuList from "@/components/revenu/revenu-list"
import ApiGet from "@/lib/useApi/get"

export default async function Page() {
  const revenus = await ApiGet("/revenus")

  return (
    <div className="sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
         <div className="sm:flex-auto">
           <h1 className="text-base font-semibold text-gray-900">売上管理</h1>
         </div>
       </div>
       <div className="mt-8 flow-root">
          <RevenuList revenus={revenus}/>
       </div>
    </div>
  )
}
