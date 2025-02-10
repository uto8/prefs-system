
import TitleComponent from '@/components/layout/title';
import { Suspense } from 'react';
import ApiGet from '@/lib/useApi/get';
import EditIssueForm from '@/components/issues/edit_issue_form';
import { Issue } from '@/types/Issue';
import Loading from '@/components/layout/loading';

export default async function IssuePage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  const { id } = params;
  const issue: Issue = await ApiGet(`/issues/${id}`)
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading/>}>
        <TitleComponent title="案件編集"/>
        <EditIssueForm issue={issue}/>
      </Suspense>
    </div>
  )
}


