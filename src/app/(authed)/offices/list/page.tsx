"use client"

import { useAppDispatch, useAppSelector } from "@/stores";
import { removeValue, setValue } from "@/stores/reducers/officeReducer";
import { useEffect } from "react";
import Link from "next/link";
import ApiGet from "@/lib/useApi/get";
import ApiDelete from "@/lib/useApi/delete";
import { useToast } from "@/hooks/use-toast";

export default function ShopList() {
  const { value } = useAppSelector((state) => state.offices);
  const dispatch = useAppDispatch();
  const {toast} = useToast();

  useEffect(() => {
    const fetch = async () => {
      try{
        const offices = await ApiGet("/offices");
        dispatch(setValue(offices));
      }  catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  },[])

  const handleDelete = async (id: string) => {
    const result = window.confirm('本当に削除しますか？');
    if(!result) return
    try{
      await ApiDelete(`/offices/${id}`)
      toast({
        variant: "success",
        title: "店舗を削除しました",
      })
      dispatch(removeValue(id));
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      const errorMessage = e.message ?? "削除に失敗しました";
      toast({
        variant: "destructive",
        title: `${errorMessage}`,
      })
      throw e;
    }
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">店舗一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            href="/offices/add"
            className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-[#0054ac] focus-visible:outline focus-visible:outline-2"
          >
            店舗追加
          </a>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    店舗名
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    店舗番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    メールアドレス
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    電話番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  加盟店
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {
                  value.map((office) => (
                    <tr key={office.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {office.name}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {office.officeCode}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{office.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{office.phoneNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{office.isFranchise? "✅": "❌"}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link href={`/sales/list?office_id=${office.id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                          営業一覧
                        </Link>
                        <Link href={`/offices/${office.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                          編集
                        </Link>
                        <button onClick={()=>{handleDelete(office.id)}} className="text-indigo-600 hover:text-indigo-900">
                          削除
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
