'use client'
import { useEffect, useState } from 'react'
import { createIssueConfirmed, getIssues, updateMemo } from './actions';
import { useAppDispatch, useAppSelector } from '@/stores';
import { setValue, updateMemoValue } from '@/stores/reducers/issueReducer';
import ContractModal from '@/components/issues/contract_modal';
import SearchModal from '@/components/issues/search_modal';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export default function IssueListPage() {
  const { value } = useAppSelector((state) => state.issues);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false)
  const [issueId, setIssueId] = useState(0)
  const [editModal, setEditModal] = useState(false)
  const [memo, setMemo] = useState("")

  useEffect(() => {
    const fetch = async () => {
      try{
        const issues = await getIssues();
        dispatch(setValue(issues));
        console.log(value)
      }  catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
    fetch()
  }, [])

  const handleContract = async ({issueId: issueId, input: input}: {
    issueId: number,
    input: {
      confirmDate: string;
      startDate: string;
      completeDate: string;
      contractValue: string
    }
  }) => {
    try{
      setEditModal(false)
      await createIssueConfirmed({
        issueId: issueId,
        confirmDate: input.confirmDate,
        startDate: input.startDate,
        completeDate: input.completeDate,
        contractValue: input.contractValue,
      })
    }catch(e) {
      throw e;
    }
  }

  const handleUpdateMemo = async ({id, memo}: {
    id: number;
    memo: string
  }) => {
    try{
      await updateMemo({
        id: id,
        memo: memo
      })
      dispatch(updateMemoValue({id, memo}));
    }catch(e) {
      console.log("===E",e)
      throw e;
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    console.log(text)
    if(!text){
      return ""
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const statusColor = (status: string) => {
    if(status === "お問いあわせ"){
      return "grey";
    }else if(status === "完了済") {
      return "green"
    }else if(status === "確定済"){
      return "blue"
    }else if(status.includes("未入金")){
      return "red"
    }

    return "yellow"
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">案件一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={()=>setOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <a
          href='/issues/add'
          className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        案件追加
        </a>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    案件番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    お客様名
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    住所
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    ステータス
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    担当者
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    メモ
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">入金</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {value.map((issue, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <a href={`/issues/${issue.id}/show`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      {issue.id}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <a href={`/issues/client/${issue.clientId}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      {issue.client.name}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.constructionSite}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`rounded-md py-1 px-2 text-xs bg-${statusColor(issue.status)}-50 text-${statusColor(issue.status)}-700 font-medium ring-1 ring-inset ring-${statusColor(issue.status)}-300`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <a href={`/sales/${issue.sale.id}/show`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      {issue.sale.name}
                      </a>
                    </td>
                    <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Dialog>
                        <DialogTrigger onClick={()=>setMemo(issue.memo)}>{issue.memo?truncateText(issue.memo, 6):'なし'}</DialogTrigger>
                        <DialogContent>
                          <DialogTitle>メモ編集</DialogTitle>
                          <div>
                            <textarea value={memo} onChange={(e)=>setMemo(e.target.value)} className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            <DialogClose asChild>
                              <Button onClick={()=>handleUpdateMemo({id: issue.id, memo: memo})} className='w-full'>保存</Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href={`/payment/list?type=deposit&issue_id=${issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                        入金
                      </a>
                      <a href={`/payment/list?type=payment&issue_id=${issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                        発注
                      </a>
                      <a href={`/payment/list?type=repair&issue_id=${issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                        補修
                      </a>
                      <button onClick={()=>{
                        setEditModal(true)
                        setIssueId(issue.id)
                      }} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      契約
                      </button>
                      <a href={`/issues/${1}/edit`} className="ml-2 text-indigo-600 hover:text-indigo-900">
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
      <SearchModal
        open={open}
        setOpen={setOpen}
      />
      <ContractModal
        editModal={editModal}
        setEditModal={()=>setEditModal(false)}
        handleContract={handleContract}
        issueId={issueId}
      />
    </div>
  )
}
