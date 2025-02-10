import { getOffices, getSales } from "./actions";
import { auth } from "@/auth";
import SaleTitle from "@/components/sales/sale_title";
import { Sale } from "@/types/Sale";

export default async function IssueList() {

  const offices = await getOffices();
  const sales: Sale[] = await getSales();
  const session = await auth();
  const isOffice = session?.user.role === "OFFICE"

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SaleTitle isOffice={isOffice} offices={offices}/>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    営業番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    営業名
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    メールアドレス
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    電話番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    店舗
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <a href={`/sales/${sale.id}/show`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      {sale.id}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.phoneNumber}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.officeName}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href={`/sales/${sale.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                        編集
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
