import RevenuList from "@/components/revenu/revenu-list"
import { OptionFields } from "@/components/ui/select-field"
import ApiGet from "@/lib/useApi/get"
import { Office } from "@/types/Office"

export default async function Page() {
  const offices = await ApiGet("/offices")
  const officeOption: OptionFields = offices.map((office: Office) => {return {value: office.id, label: office.name}})

  return (
    <div className="">
       <div className="mt-8 flow-root">
          <RevenuList offices={officeOption}/>
       </div>
    </div>
  )
}
