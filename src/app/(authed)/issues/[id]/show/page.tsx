import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get'
import { format } from 'date-fns';
import { Suspense } from 'react'

async function IssueDetails({ params }: { params: { id: string } }) {

  const { id } = params;
  const issue = await ApiGet(`/issues/${id}`)
  console.log(issue)

  return (
    <div>
      <TitleComponent title="案件詳細"/>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">現住所</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.currentAddress}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">工事予定日</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(issue.preferredDate, "yyyy年MM月dd日")}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">タイプ</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{issue.type}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">連絡内容</dt>
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
