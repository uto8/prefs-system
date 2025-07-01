import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get'
import { format } from 'date-fns';
import { Suspense } from 'react'
import ShowButton from './ShowButton';

async function IssueDetails({ params }: { params: { id: string } }) {

  const { id } = params;
  const issue = await ApiGet(`/issues/${id}`)
  console.log("=sale", issue)

  return (
    <div>
      <TitleComponent title="案件詳細"/>
      <div>
        <ShowButton issue={issue} />
        {/* <button onClick={()=>{
          if(!issue)return
          setEditModal(true)
          setIssueContractData(issue)
        }} className="ml-2 text-indigo-600 hover:text-indigo-900">
        契約
        </button>
        {
          issue.status.includes("失注")?<button onClick={()=>{
            handleRemoveLost({id:issue.id,status:"失注解除"})
          }} className="ml-2 text-indigo-600 hover:text-indigo-900">
          失注解除
          </button>: <button onClick={()=>{
            if(!issue)return
            setLostModal(true)
            setIssueContractData(issue)
          }}  className="ml-2 text-indigo-600 hover:text-indigo-900">
          失注
          </button>
        }
        {issue.status === "入金済" ? <button onClick={()=>{
          if(!issue)return
          setCompleteModal(true)
          setIssueContractData(issue)
        }} className="ml-2 text-indigo-600 hover:text-indigo-900">
        完了
        </button>: null} */}

      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">現住所</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.currentAddress}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">工事予定日</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.preferredDate}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">タイプ</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.type}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">備考</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.contactContent}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">予算</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.budget}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">工事住所</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.constructionSite}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">加盟店</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{(issue.isFranchise ==1)? "別元請": "SOTORIE"}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">案件登録日</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(issue.createdAt, "yyyy年MM月dd日")}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">顧客番号</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.client.id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">お客様名</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.client.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">お客様名かな</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.client.nameKana}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">メールアドレス</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={`mailto:${issue.client.email}`} className="text-blue-500 underline">{issue.client.email}</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">電話番号</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={`tel:${issue.client.phoneNumber}`} className="text-blue-500 underline">{issue.client.phoneNumber}</a></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default async function IssuePage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading product details...</div>}>
        <IssueDetails params={params} />
      </Suspense>
    </div>
  )
}
