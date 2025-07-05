"use client"

import { toast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/stores';
import { setValue, updateEstimateDateValue, updateMemoValue } from '@/stores/reducers/issueDetailReducer';
import { Issue } from '@/types/Issue'
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { createIssueConfirmed, updateIssueConfirmed, updateMemo } from '@/app/(authed)/issues/list/actions';
import { updateDatetimeValue, updateStatusValue } from '@/stores/reducers/issueReducer';
import ContractModal from './contract_modal';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import ApiGet from '@/lib/useApi/get';
import { setMeetingValue } from '@/stores/reducers/meetingReducer';
import MeetingHistories from './meeting-histories';
import ApiPost from '@/lib/useApi/post';
import ApiPut from '@/lib/useApi/put';

export default function IssueDetail({
  issueData
}:{
  issueData: Issue
}) {
  const dispatch = useAppDispatch();
  const { value: issue } = useAppSelector((state) => state.issue);
  useEffect(() => {
    dispatch(setValue(issueData));
  }, []);
  const [editModal, setEditModal] = useState(false)
  const [memo, setMemo] = useState("")
  const { value: meetings } = useAppSelector((state) => state.meetings);
  const [datetime, setDatetime] = useState("")
  const [estimateDate, setEstimateDatetime] = useState("")

  const truncateText = (text: string, maxLength: number) => {
    if(!text){
      return ""
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

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
  const handleCreateEstimateDate = async ({id, date}: {
    id: number;
    date: string
  }) => {
    if(date === "") {
      await ApiPut(`/issues/${id}/estimate_date`, {
        date: date,
        status: "提出済取消中"
      })
      dispatch(updateStatusValue({id:id, status:"提出済取消中"}));
      return
    }
    await ApiPut(`/issues/${id}/estimate_date`, {
      date: date,
      status: "提出済返事待ち"
    })
    dispatch(updateEstimateDateValue({id:id, date: date}));
  }

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
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">案件番号</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.issueCode}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">店舗名</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.office.name}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">お客様名</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.name}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">フリガナ</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.nameKana}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">案件種別</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.type}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">現住所</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.currentAddress}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">工事住所</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.constructionSite}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">電話番号</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.phoneNumber}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">メールアドレス</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client.email}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">備考(お問い合わせ内容)</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.contactContent}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">メモ</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.memo}</dd>
        </div>

        <div style="page-break-before: always;"></div>

        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">申し込み日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">初回打ち合わせ</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">2回目</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">3回目</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">プラン提出日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">契約日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">着手金入金日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">着工日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">完工日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">引渡日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">完工金入金日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"></dd>
        </div>

      </dl>
    `;

    // PDFを生成
    const options = {
      margin: 1,
      filename: `issue_${issue.client?.id || 'unknown'}.pdf`,
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
        <button
          onClick={() => {
            if(!issue)return
            handleGeneratePDF(issue)
          }}
          className="ml-2 text-indigo-600 hover:text-indigo-900">
          PDF出力
        </button>
        <button onClick={()=>{
          if(!issue)return
          setEditModal(true)
        }} className="ml-2 text-indigo-600 hover:text-indigo-900">
        契約
        </button>
        <a href={`/payment/list?type=deposit&issue_id=${issueData.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
          入金
        </a>
        <a href={`/payment/list?type=payment&issue_id=${issueData.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
          発注
        </a>
        <a href={`/payment/list?type=repair&issue_id=${issueData.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
          補修
        </a>
        <div className='ml-2 text-indigo-600 '>
          <Dialog>
            <DialogTrigger onClick={()=> {getMeetings(issueData.id)}}>
              {issue?.datetime?`${format(issue.datetime, "MM月dd日 HH時mm分")}`:"打ち合わせ予定日"}
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>打ち合わせ</DialogTitle>
              <div>
                <input value={datetime} onChange={(e)=>setDatetime(e.target.value)} type='datetime-local' className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                <DialogClose asChild>
                  <Button onClick={()=>handleCreateMeeting(issueData.id, datetime)} className='w-full'>保存</Button>
                </DialogClose>
              </div>
              <div>
                <MeetingHistories meetings={meetings}/>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className='ml-2 text-indigo-600 '>
          <Dialog>
            <DialogTrigger onClick={()=> {getMeetings(issueData.id)}}>
              {issue?.estimateSubmissionDate?`${format(issue.estimateSubmissionDate, "MM月dd日 HH時mm分")}`:"未定"}
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
        </div>
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
            <dt className="text-sm/6 font-medium text-gray-900">備考</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue?.contactContent}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">メモ</dt>
            <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-indigo-600">
            <Dialog>
              <DialogTrigger onClick={()=>setMemo(issue?.memo ?? "")}>{issue?.memo?truncateText(issue.memo, 6):"なし"}</DialogTrigger>
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
