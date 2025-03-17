'use client'

import { useAppDispatch, useAppSelector } from '@/stores';
import { removeIssue, setValue, updateDatetimeValue, updateMemoValue } from '@/stores/reducers/issueReducer';
import ContractModal from '@/components/issues/contract_modal';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react';
import { Issue } from '@/types/Issue';
import { createIssueConfirmed, updateIssueConfirmed, updateMemo } from '@/app/(authed)/issues/list/actions';
import { useToast } from '@/hooks/use-toast';
import ApiDelete from '@/lib/useApi/delete';
import MeetingHistories from '../meeting-histories';
import { format } from 'date-fns';
import ApiPost from '@/lib/useApi/post';
import ApiGet from '@/lib/useApi/get';
import { setMeetingValue } from '@/stores/reducers/meetingReducer';
import CompleteModal from '../complete_modal';

export default function IssueListTable({issues: issues}: {
  issues: Issue[]
}) {
  const [issueContractData, setIssueContractData] = useState<Issue | null>(null)
  const [editModal, setEditModal] = useState(false)
  const [completeModal, setCompleteModal] = useState(false)
  const [datetime, setDatetime] = useState("")
  const [memo, setMemo] = useState("")
  const { toast } = useToast()

  const { value } = useAppSelector((state) => state.issues);
  const dispatch = useAppDispatch();
  const { value: meetings } = useAppSelector((state) => state.meetings);

  useEffect(() => {
    const fetch = async () => {
      try{
        dispatch(setValue(issues));
      }  catch (error) {
        throw error;
      }
    }
    fetch()
  }, [])

  const handleContract = async ({issueId: issueId, issueConfirmId: issueConfirmId, input: input}: {
    issueId: number,
    issueConfirmId: number | null,
    input: {
      confirmDate: string;
      startDate: string;
      completeDate: string;
      contractValue: string
    }
  }) => {
    try{
      setEditModal(false)
      if(issueConfirmId){
        await updateIssueConfirmed({
          id: issueConfirmId,
          body: {
            confirmDate: input.confirmDate,
            startDate: input.startDate,
            completeDate: input.completeDate,
            contractValue: input.contractValue,
          }
        })
        toast({
          variant: "success",
          title: "契約更新しました",
        })
      }else{
        await createIssueConfirmed({
          issueId: issueId,
          confirmDate: input.confirmDate,
          startDate: input.startDate,
          completeDate: input.completeDate,
          contractValue: input.contractValue,
        })
        toast({
          variant: "success",
          title: "契約確定しました",
        })
      }

    }catch(e) {
      throw e;
    }
  }

  const handleCreateMeeting = async (issueId: number, date: string) => {
    if(date === "") return
    await ApiPost("/meetings", {
      issueId: issueId,
      datetime: date,
      description: ""
    })
    dispatch(updateDatetimeValue({id: issueId, datetime: date}));
  }

  const getMeetings = async (issueId: number) => {
    try{
      const meetings = await ApiGet(`/meetings/${issueId}`)
      dispatch(setMeetingValue(meetings));
    }catch(e) {
      throw e
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
      throw e;
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if(!text){
      return ""
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleDelete = async (id: number) => {
    const result = window.confirm('本当に削除しますか？');
    if(!result) return
    try{
      await ApiDelete(`/issues/${id}`)
      toast({
        variant: "success",
        title: "案件を削除しました",
      })
      dispatch(removeIssue(id));
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

  const status = (status: string) => {
    let statusColor = "yellow"
    if(status === "お問い合わせ"){
      return <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
        {status}
      </span>
    }else if(status === "完了済") {
      statusColor = "green"
      return <span className='rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20'>
        {status}
      </span>
    }else if(status === "確定済"){
      return <span className={`rounded-md py-1 px-2 text-xs bg-blue-50 text-blue-700 font-medium ring-1 ring-inset ring-blue-300`}>
        {status}
      </span>
    }else if(status.includes("未入金")){
      return <span className="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10">
        {status}
      </span>
    }else if(status.includes("入金済")){
      return <span className='rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20'>
        {status}
      </span>
    }

    return (
      <span className={`rounded-md py-1 px-2 text-xs bg-${statusColor}-50 text-${statusColor}-700 font-medium ring-1 ring-inset ring-${statusColor}-300`}>
        {status}
      </span>
    )
  }

  return <>
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
                  <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                    打ち合わせ
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
                      {issue.issueCode}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <a href={`/issues/client/${issue.clientId}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      {issue.client?issue.client.name: null}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{truncateText(issue.constructionSite, 8)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {status(issue.status)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <a href={`/sales/${issue.sale.id}/show`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      {issue.sale?issue.sale.name:null}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Dialog>
                        <DialogTrigger onClick={()=> {getMeetings(issue.id)}}>
                          {issue.datetime?`${format(issue.datetime, "MM月dd日 HH時mm分")}`:"未定"}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>打ち合わせ</DialogTitle>
                          <div>
                            <input value={datetime} onChange={(e)=>setDatetime(e.target.value)} type='datetime-local' className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            <DialogClose asChild>
                              <Button onClick={()=>handleCreateMeeting(issue.id, datetime)} className='w-full'>保存</Button>
                            </DialogClose>
                          </div>
                          <div>
                            <MeetingHistories meetings={meetings}/>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                      <button onClick={()=>{
                        if(!issue)return
                        setEditModal(true)
                        setIssueContractData(issue)
                      }} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      契約
                      </button>
                      {issue.status === "完了済" ? <button onClick={()=>{
                        if(!issue)return
                        setCompleteModal(true)
                        setIssueContractData(issue)
                      }} className="ml-2 text-indigo-600 hover:text-indigo-900">
                      完了
                      </button>: null}
                      <a href={`/payment/list?type=deposit&issue_id=${issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                        入金
                      </a>
                      <a href={`/payment/list?type=payment&issue_id=${issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                        発注
                      </a>
                      <a href={`/payment/list?type=repair&issue_id=${issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
                        補修
                      </a>
                      <a href={`/issues/${issue.id}/edit`} className="ml-2 text-indigo-600 hover:text-indigo-900 mr-2">
                        編集
                      </a>
                      <button onClick={()=>{handleDelete(issue.id)}} className="text-indigo-600 hover:text-indigo-900">
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ContractModal
        editModal={editModal}
        setEditModal={()=>setEditModal(false)}
        handleContract={handleContract}
        issue={issueContractData}
      />
      <CompleteModal
        editModal={completeModal}
        setEditModal={()=>setCompleteModal(false)}
        issue={issueContractData}
      />
  </>
}
