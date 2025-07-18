"use server"

import IssueDetail from '@/components/issues/issue-detail';
import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get'
import { Issue } from '@/types/Issue';
import { Suspense } from 'react'

async function IssueDetails({ params }: { params: { id: string } }) {

  const { id } = params;
  const issue:Issue = await ApiGet(`/issues/${id}`)
  console.log(issue)

  return (
    <div>
      <TitleComponent title="案件詳細"/>
      <IssueDetail issueData={issue}/>
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
