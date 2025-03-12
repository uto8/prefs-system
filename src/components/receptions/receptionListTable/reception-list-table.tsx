"use client"

import { useToast } from "@/hooks/use-toast"
import ApiDelete from "@/lib/useApi/delete"
import { Reception } from "@/types/Reception"

export default function ReceptionListTable({
  receptions: receptions
}: {
  receptions: Reception[]
}) {

  const {toast} = useToast()

  const handleDelete = async (id: string) => {
    const result = window.confirm('本当に削除しますか？');
    if(!result) return
    try{
      await ApiDelete(`/receptions/${id}`)
      toast({
        variant: "success",
        title: "受付を削除しました",
      })
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
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              受付番号
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              受付名
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
          {receptions.map((reception, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                <a href={`/receptions/${reception.id}/show`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                {reception.id}
                </a>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reception.name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reception.email}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reception.phoneNumber}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reception.officeName}</td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <a href={`/receptions/${reception.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                  編集
                </a>
                <button onClick={()=>{handleDelete(reception.id)}} className="text-indigo-600 hover:text-indigo-900">
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
