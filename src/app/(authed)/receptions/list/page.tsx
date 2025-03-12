import { auth } from "@/auth";
import ReceptionTitle from "@/components/receptions/reception-title";
import ReceptionListTable from "@/components/receptions/receptionListTable/reception-list-table";
import SaleTitle from "@/components/sales/sale_title";
import SaleListTable from "@/components/sales/saleListTable/sale-list-table";
import ApiGet from "@/lib/useApi/get";

export default async function ReceptionList() {

  const session = await auth();
  const isOffice = session?.user.role === "OFFICE"

  const [offices, receptions] = await Promise.all([
    ApiGet('/offices'),
    ApiGet('/receptions')
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ReceptionTitle isOffice={isOffice} offices={offices}/>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <ReceptionListTable receptions={receptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
