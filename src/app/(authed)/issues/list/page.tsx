"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchModal from "@/components/issues/search_modal";
import IssueListTable from "@/components/issues/issueListTable/issue-list-table";
import ApiGet from "@/lib/useApi/get";
import { DataPagination } from "@/components/layout/pagenation";
import { Issue } from "@/types/Issue";

export default function IssueListPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = Number(page) || 1;
  const LIMIT = 20;
  const offset = (currentPage - 1) * LIMIT;

  const [issues, setIssues] = useState<{ data: Issue[]; totalCount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ApiGet(`/issues?limit=${LIMIT}&offset=${offset}`)
      .then((data) => setIssues(data))
      .finally(() => setLoading(false));
  }, [page]);

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
        <></>
      ) : (
        <>
          <IssueListTable issues={issues?.data || []} />
          {issues && LIMIT < issues.totalCount && (
            <DataPagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
}
