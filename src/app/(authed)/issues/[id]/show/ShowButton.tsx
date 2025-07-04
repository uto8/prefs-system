"use client"

import React from 'react'
import { useAppDispatch } from '@/stores';
import { removeIssue } from '@/stores/reducers/issueReducer';
import { Issue } from '@/types/Issue';
import { useToast } from '@/hooks/use-toast';
import ApiDelete from '@/lib/useApi/delete';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function ShowButton(data: { issue: Issue }) {

  const dispatch = useAppDispatch();
  const { toast } = useToast()
  const router = useRouter();
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
          <dt class="text-sm font-medium text-gray-900">現住所</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.currentAddress || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">工事予定日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.preferredDate || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">タイプ</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.type || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">備考</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.contactContent || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">予算</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.budget || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">工事住所</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.constructionSite || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">加盟店</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.isFranchise ? '別元請' : 'SOTORIE'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">案件登録日</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.createdAt ? format(issue.createdAt, 'yyyy年MM月dd日') : '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">顧客番号</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client?.id || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">お客様名</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client?.name || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">お客様名かな</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client?.nameKana || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">メールアドレス</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client?.email || '未設定'}</dd>
        </div>
        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">電話番号</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">${issue.client?.phoneNumber || '未設定'}</dd>
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
      router.push("/issues/list");
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
      <button className="ml-2 text-indigo-600 hover:text-indigo-900" onClick={() => handleGeneratePDF(data.issue)}>お客様シート発行</button>
      <a href={`/payment/list?type=deposit&issue_id=${data.issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
        入金
      </a>
      <a href={`/payment/list?type=payment&issue_id=${data.issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
        発注
      </a>
      <a href={`/payment/list?type=repair&issue_id=${data.issue.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900">
        補修
      </a>
      <a href={`/issues/${data.issue.id}/edit`} className="ml-2 text-indigo-600 hover:text-indigo-900 mr-2">
        編集
      </a>
      <button onClick={()=>{handleDelete(data.issue.id)}} className="text-indigo-600 hover:text-indigo-900">
        削除
      </button>
    </>
  )
}
