'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/stores";
import { useEffect } from "react"
import { getOffices, getSales } from "./actions";
import { setValue as setOfficeValue } from "@/stores/reducers/officeReducer";
import { setValue as setSaleValue } from "@/stores/reducers/saleReducer";
import { useRouter } from "next/navigation";

export default function IssueList() {
  const { value: offices } = useAppSelector((state) => state.offices);
  const { value: sales } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try{
        const offices = await getOffices();
        const sales = await getSales();

        dispatch(setOfficeValue(offices));
        dispatch(setSaleValue(sales))
      }  catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">営業一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-[#0054ac] focus-visible:outline focus-visible:outline-2"
            >営業追加</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>店舗を選択してください</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                offices.map((office, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => router.push(`/sales/add?office_id=${office.id}`)}
                  >{office.name}</DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
                    住所
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
                      {sale.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sale.phoneNumber}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="/sales/1/edit" className="text-indigo-600 hover:text-indigo-900">
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
  )
}
