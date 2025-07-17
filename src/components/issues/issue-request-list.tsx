"use client"
import { IssueRequest } from '@/types/IssueRequest'
import { useState } from 'react'
import RequestModal from './request_modal';
import { Issue } from '@/types/Issue';
import ApiGet from '@/lib/useApi/get';
import { Office } from '@/types/Office';
import { OptionFields } from '../ui/select-field';
import ApiPut from '@/lib/useApi/put';
import { useToast } from '@/hooks/use-toast';

export default function IssueRequestList({
  issueRequests,
  issueData,
  role
}:{
  issueRequests: IssueRequest[],
  issueData: Issue,
  role: string | undefined
}) {
  const [opened, setOpened] = useState(false);
  const [offices, setOffices] = useState<OptionFields>([]);
  const {toast} = useToast();
  const OpenRequestModal = async () => {
    const offices: Office[] = await ApiGet('/offices')
    const officeOption: OptionFields = offices.map((office: Office) => {return {value: office.id, label: office.name}})
    setOffices(officeOption);
    setOpened(true);
  }
  const handleUpdateStatus = async (issueRequestId: number, status: string) => {
    try{
      console.log("handleUpdateStatus", status)
      if(status === ""){ return }
      console.log("`/issue_requests/${issueData.id}`,", `/issue_requests/${issueData.id}`,)
      console.log("==status", status)
      await ApiPut(`/issue_requests/${issueRequestId}`, { status: status });
      toast({
        title: "ステータスの更新に成功しました",
        description: "ステータスの更新が正常に送信されました。",
        variant: "success"
      })
    }catch(e){
      toast({
        title: "ステータスの更新に失敗しました",
        description: "ステータスの更新に失敗しました。もう一度お試しください。",
        variant: "destructive"
      })
    }
  }
  return (
    <>
    <div className="flex justify-end">
        <button
          onClick={() => {
            OpenRequestModal();
          }}
          className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          リクエスト追加
        </button>
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
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    担当者名
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    ステータス
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {issueRequests.map((issueRequest, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {issueRequest.officeName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issueRequest.saleName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{
                      issueRequest.status === "pending" ? "保留中" :
                      issueRequest.status === "approved" ? "承認済み" :
                      issueRequest.status === "rejected" ? "拒否" :
                      issueRequest.status === "cancel" ? "キャンセル" :
                      "不明"
                    }
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {issueRequest.status === 'pending' &&<>{
                        role === 'ADMIN' || role === 'RECEPTION' ?<select onChange={(e) => {
                          handleUpdateStatus(issueRequest.id, e.target.value)
                        }}>
                          <option value="">選択してください</option>
                          <option value="canceled">
                            キャンセル
                          </option>
                        </select>:<select onChange={(e) => {
                          handleUpdateStatus(issueRequest.id, e.target.value)
                        }}>
                          <option value="">選択してください</option>
                          <option value="approved">
                            承認
                          </option>
                          <option value="rejected">
                            拒否
                          </option>
                        </select>
                      }</>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RequestModal
        editModal={opened}
        setEditModal={()=>setOpened(false)}
        issueId={issueData.id}
        offices={offices}
      />
    </>
  )
}
