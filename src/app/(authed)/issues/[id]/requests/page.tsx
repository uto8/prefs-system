"use server"

import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get'
import IssueRequestList from '@/components/issues/issue-request-list';
import { auth } from '@/auth';


export default async function Page(
  props: {
    params: Promise<{ id: string }>
  }) {
  const params = await props.params;
  const { id } = params;
  const [issueRequests, issue, session] = await Promise.all([
    ApiGet(`/issue_requests/${id}/issues`),
    ApiGet(`/issues/${id}`),
    auth()
  ]);
  return (
    <>
      <TitleComponent title={`リクエスト一覧`}/>
      <IssueRequestList issueData={issue} issueRequests={issueRequests} role={session?.user.role}/>
    </>
  )
}
