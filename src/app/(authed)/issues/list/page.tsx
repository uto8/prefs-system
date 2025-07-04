"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchModal from "@/components/issues/search_modal";
import IssueListTable from "@/components/issues/issueListTable/issue-list-table";
import { DataPagination } from "@/components/layout/pagenation";
import { Issue } from "@/types/Issue";
import { useAppDispatch } from "@/stores";
import { setValue } from "@/stores/reducers/issueReducer";
import { searchIssues } from "@/components/issues/actions";

export default function IssueListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const issueCode = searchParams.get("issue_code") || null;
  const clientName = searchParams.get("client_name") || null;
  const officeId = searchParams.get("office_id") || null;
  const saleId = searchParams.get("sale_id") || null;
  const status = searchParams.get("status") || null;
  const createdAtFrom = searchParams.get("created_at_from") || null;
  const createdAtTo = searchParams.get("created_at_to") || null;
  const sortType = searchParams.get("sort_type") || null;
  const currentPage = Number(page) || 1;
  const LIMIT = 20;
  const offset = (currentPage - 1) * LIMIT;

  const [issues, setIssues] = useState<{ data: Issue[]; totalCount: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const issues = await searchIssues({
        client_name: clientName,
        type: null,
        sale_id: saleId,
        office_id: officeId,
        status: status,
        issueCode: issueCode,
        offset: offset,
        createdAtFrom: createdAtFrom,
        createdAtTo: createdAtTo,
        sortType: sortType,
      })
      dispatch(setValue(issues.data));
      setIssues(issues)
      setLoading(false)
    }
    fetchData()
    let queryData = ""
    if(issueCode){
      queryData += `&issue_code=${issueCode}`
    }
    if(clientName){
      queryData += `&client_name=${clientName}`
    }
    if(officeId){
      queryData += `&office_id=${officeId}`
    }
    if(saleId){
      queryData += `&sale_id=${saleId}`
    }
    if(status){
      queryData += `&status=${status}`
    }
    if(createdAtFrom){
      queryData += `&created_at_from=${createdAtFrom}`
    }
    if(createdAtTo){
      queryData += `&created_at_to=${createdAtTo}`
    }
    if(sortType){
      queryData += `&sort_type=${sortType}`
    }
    setQuery(queryData)
  }, [page,searchParams]);

  const totalPages = issues ? Math.ceil(issues.totalCount / LIMIT) : 1;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">案件一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {/* 検索フォーム */}
          <SearchModal offset={offset} />
        </div>
      </div>
      <div className="flex justify-end">
        <a
          href="/issues/add"
          className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          案件追加
        </a>
      </div>
      {loading ? (
        <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
      ) : (
        <>
          <IssueListTable issues={issues?.data || []} />
          {issues && LIMIT < issues.totalCount && (
            <DataPagination currentPage={currentPage} totalPages={totalPages} link="issues" query={query} />
          )}
        </>
      )}
    </div>
  );
}
