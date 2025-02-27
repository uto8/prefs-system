'use server'

import SearchModal from '@/components/issues/search_modal';
import IssueListTable from '@/components/issues/issueListTable/issue-list-table';
import ApiGet from '@/lib/useApi/get';



export default async function IssueListPage() {

  const [issues] = await Promise.all([
    ApiGet('/issues'),
  ]);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">案件一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {/* 検索フォーム */}
          <SearchModal/>
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
      <IssueListTable issues={issues}/>
    </div>
  )
}
