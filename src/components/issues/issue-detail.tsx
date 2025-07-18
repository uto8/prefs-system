"use client"

import { toast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/stores';
import { updateMemoValue, updateStatusValue } from '@/stores/reducers/issueDetailReducer';
import { Issue } from '@/types/Issue'
import React, { useEffect, useState } from 'react'
import { createIssueConfirmed, updateIssueConfirmed, updateMemo, updateStatus } from '@/app/(authed)/issues/list/actions';
import { updateDatetimeValue } from '@/stores/reducers/issueReducer';
import ContractModal from './contract_modal';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import ApiGet from '@/lib/useApi/get';
import { setMeetingValue } from '@/stores/reducers/meetingReducer';
import MeetingHistories from './meeting-histories';
import ApiPost from '@/lib/useApi/post';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function IssueDetail({
  issueData
}:{
  issueData: Issue
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { value: issue } = useAppSelector((state) => state.issue);
  const [selectIssueStatus, setSelectIssueStatus] = useState(issueData.status);

  useEffect(() => {
    setSelectIssueStatus(issueData.status);
  }, [issueData.status]);
  const [editModal, setEditModal] = useState(false)
  const [memo, setMemo] = useState("")
  const { value: meetings } = useAppSelector((state) => state.meetings);
  const [datetime, setDatetime] = useState("")
  const [time, setTime] = useState("00")
  const [hour, setHour] = useState("0")
  // const [estimateDate, setEstimateDatetime] = useState("")
  const issueStatus = [
    "問い合わせ",
    "担当先確認中",
    "担当確定",
    "アポイント確定",
    "初回打合せ完了",
    "FP提案済み",
    "SP提案済み",
    "TP提案済み",
    "クロージング済み（返答待）",
    "保留",
    "打合わせ前失注",
  ]

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
        dispatch(updateStatusValue({id:issueId, status:"確定済"}));
        toast({
          variant: "success",
          title: "契約確定しました",
        })
      }

    }catch(e) {
      throw e;
    }
  }

  // 見積もり提出日登録
  // const handleCreateEstimateDate = async ({id, date}: {
  //   id: number;
  //   date: string
  // }) => {
  //   if(date === "") {
  //     await ApiPut(`/issues/${id}/estimate_date`, {
  //       date: date,
  //       status: "提出済取消中"
  //     })
  //     dispatch(updateStatusValue({id:id, status:"提出済取消中"}));
  //     return
  //   }
  //   await ApiPut(`/issues/${id}/estimate_date`, {
  //     date: date,
  //     status: "提出済返事待ち"
  //   })
  //   dispatch(updateEstimateDateValue({id:id, date: date}));
  // }

  const handleUpdateMemo = async ({id, memo}: {
    id: number;
    memo: string
  }) => {
    try{
      console.log(id, memo)
      await updateMemo({
        id: id,
        memo: memo
      })
      dispatch(updateMemoValue({id, memo}));
    }catch(e) {
      throw e;
    }
  }

  const getMeetings = async (issueId: number) => {
    try{
      const meetings = await ApiGet(`/meetings/${issueId}`)
      dispatch(setMeetingValue(meetings));
    }catch(e) {
      throw e
    }
  }

  // PDF発行
  const handleGeneratePDF = async (issue: Issue) => {
    // HTMLコンテンツを作成
    const content = document.createElement('div');
    content.innerHTML = `
      <dl class="divide-y divide-gray-100">
        <div class="text-center flex w-full justify-between font-bold pl-2 bg-slate-400">
          <p>お客様シート</p>
          <div class="p-2 bg-white">
            <img src="/logo.png" alt="Logo" class="object-contain w-24">
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">案件番号</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.issueCode}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">店舗名</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.office.name}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">担当者</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.sale.name}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">進捗</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.status}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">お客様名</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.name}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">フリガナ</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.nameKana}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">案件種別</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.type}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">現住所</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.currentAddress}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">工事住所</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.constructionSite}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">電話番号</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.phoneNumber}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">メールアドレス</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.email}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">ハウスメーカー</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issueData.houseMaker}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">お問い合わせ種別</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issueData.contactType}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">備考(お問い合わせ内容)</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.contactContent}</dd>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="px-2 py-2 text-sm font-bold bg-slate-200 text-gray-900">メモ</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.memo}</dd>
        </div>
        <div class="text-center w-full font-bold px-2 py-2 bg-slate-400">
          <p class="text-center">手書き入力欄</p>
        </div>
        <div class="flex">
          <dl class="divide-y">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">顧客情報</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">予算</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">建物着工日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">建物引き渡し日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">お引越し予定日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">メモ</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
          </dl>

          <dl class="divide-y">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">申し込み日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${format(issue.createdAt, "yyyy年MM月dd日")}</dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">初回打ち合わせ</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">2回目</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">3回目</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">プラン提出日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">契約日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">着手金入金日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">着工日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">完工日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">引渡日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm px-2 py-2 text-gray-900 font-bold bg-slate-200">完工金入金日</dt>
              <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
          </dl>

        </div>
      </dl>
    `;

    // PDFを生成
    const options = {
      margin: 0.2,
      filename: `お客様シート${issue.issueCode}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    try{
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().set(options).from(content).save();
    }catch(e){
      console.error('PDF生成中にエラーが発生しました:', e);
    }

  };

  // 打ち合わせ日登録
  const handleCreateMeeting = async (issueId: number, date: string) => {
    if(date === "") return
    await ApiPost("/meetings", {
      issueId: issueId,
      datetime: date,
      description: ""
    })
    dispatch(updateDatetimeValue({id: issueId, datetime: date}));
  }

  // const handleDelete = async (id: number) => {
  //   const result = window.confirm('本当に削除しますか？');
  //   if(!result) return
  //   try{
  //     await ApiDelete(`/issues/${id}`)
  //     toast({
  //       variant: "success",
  //       title: "案件を削除しました",
  //     })
  //     router.back();
  //    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   }catch(e: any){
  //     const errorMessage = e.message ?? "削除に失敗しました";
  //     toast({
  //       variant: "destructive",
  //       title: `${errorMessage}`,
  //     })
  //     throw e;
  //   }
  // }
  return (
    <>
      <div className='flex flex-wrap'>
        <a
          href={`/issues/${issueData.id}/files`}
          className="ml-2 text-indigo-600 hover:text-indigo-900">
          ファイル管理
        </a>
        <button
          onClick={() => {
            if(!issue)return
            handleGeneratePDF(issue)
          }}
          className="ml-2 text-indigo-600 hover:text-indigo-900">
          お客様シート出力
        </button>

        <div className='ml-2 text-indigo-600 '>
          <Dialog>
            <DialogTrigger onClick={()=> {getMeetings(issueData.id)}}>
              打合日入力
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>打ち合わせ</DialogTitle>
              <div>
                <div className='flex mb-4'>
                  <input value={datetime} type='date' onChange={(e)=>setDatetime(e.target.value)} className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                  <select
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="min-w-8 bg-white ml-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hourStr = i.toString().padStart(2, '0');
                      return (
                        <option key={hourStr} value={hourStr}>
                          {hourStr}
                        </option>
                      );
                    })}
                  </select>
                  <div className='flex items-center'>時</div>
                  <select value={time} onChange={(e)=>setTime(e.target.value)} className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out">
                    <option value="00">00</option>
                    <option value="10">10</option>
                    <option value="10">20</option>
                    <option value="30">30</option>
                    <option value="10">40</option>
                    <option value="45">50</option>
                    <option value="10">60</option>
                  </select>
                  <div className='flex items-center'>分</div>
                </div>
                <DialogClose asChild>
                  <Button onClick={()=>handleCreateMeeting(issueData.id, `${datetime}-${hour}-${time}`)} className='w-full'>保存</Button>
                </DialogClose>
              </div>
              <div>
                <MeetingHistories meetings={meetings}/>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <button
          onClick={() => {
            if(!issue)return
            router.push(`/issues/${issue.id}/requests`)
          }}
          className="ml-2 text-indigo-600 hover:text-indigo-900">
          リクエスト
        </button>
        {/* <div className='ml-2 text-indigo-600 '>
          <Dialog>
            <DialogTrigger onClick={()=> {getMeetings(issueData.id)}}>
              見積もり提出日入力
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>見積提出日</DialogTitle>
              <div>
                <input value={estimateDate} onChange={(e)=>setEstimateDatetime(e.target.value)} type='datetime-local' className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                <DialogClose asChild>
                  <Button onClick={()=>handleCreateEstimateDate({id: issueData.id, date: estimateDate})} className='w-full'>保存</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">案件番号</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.issueCode}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">店舗名</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.office.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">担当者</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.sale.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">進捗</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {
              issue && !issue.issueConfirmed.id?<select
                defaultValue={selectIssueStatus}
                onChange={async (e) => {
                  const res = await updateStatus({ id: issueData.id, status: e.target.value })
                  console.log("==-res-=", res)
                  console.log("==e.target.value", e.target.value)
                  setSelectIssueStatus(e.target.value)
                  dispatch(updateStatusValue({id: issueData.id, status: e.target.value}))}
                }
                className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm w-[180px]">
                {
                  issueStatus.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))
                }
              </select>:issue?.status
            }

            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">お客様名</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.client.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">フリガナ</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.client.nameKana}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">案件種別</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.type}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">現住所</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.currentAddress}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">工事住所</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.constructionSite}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">電話番号</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.client.phoneNumber}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">メールアドレス</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.client.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">ハウスメーカー</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issueData?.houseMaker}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">お問い合わせ種別</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issueData?.contactType}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">備考</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.contactContent}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">メモ</dt>
            <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-indigo-600">
            <Dialog>
              <DialogTrigger onClick={()=>setMemo(issue?.memo ?? "")}>{issue?.memo?issue.memo:"なし"}</DialogTrigger>
              <DialogContent>
                <DialogTitle>メモ編集</DialogTitle>
                <div>
                  <textarea value={memo} onChange={(e)=>setMemo(e.target.value)} className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                  <DialogClose asChild>
                    <Button onClick={()=>handleUpdateMemo({id: issueData.id, memo: memo})} className='w-full'>保存</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            </dd>
          </div>
        </dl>
      </div>
      <div className='flex'>
        <button onClick={()=>{
          if(!issue)return
          setEditModal(true)
        }} className="ml-2 text-indigo-600 hover:text-indigo-900">
        契約
        </button>
        <a href={`/payment/list?type=deposit&issue_id=${issueData.id}`} className="text-lg ml-2 text-indigo-600 hover:text-indigo-900">
          入金
        </a>
        <a href={`/payment/list?type=payment&issue_id=${issueData.id}`} className="text-lg ml-2 text-indigo-600 hover:text-indigo-900">
          発注
        </a>
        <a href={`/payment/list?type=repair&issue_id=${issueData.id}`} className="text-lg ml-2 text-indigo-600 hover:text-indigo-900">
          補修
        </a>
        <a href={`/issues/${issueData.id}/edit`} className="text-lg ml-2 text-indigo-600 hover:text-indigo-900 mr-2">
          編集
        </a>
      </div>

      {/* 契約ポップアップ */}
      <ContractModal
        editModal={editModal}
        setEditModal={()=>setEditModal(false)}
        handleContract={handleContract}
        issue={issue}
      />
    </>
  )
}
