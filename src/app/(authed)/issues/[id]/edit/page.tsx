
import TitleComponent from '@/components/layout/title';
import { Suspense } from 'react';
import ApiGet from '@/lib/useApi/get';
import Loading from '@/components/layout/loading';
import EditIssueForm from '@/components/issues/editIssueForm/edit-issue-form';

export default async function IssuePage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  const { id } = params;
  await ApiGet(`/issues/${id}`)
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading/>}>
        <TitleComponent title="案件編集"/>
        <EditIssueForm offices={[]} sales={[]}/>
      </Suspense>
    </div>
  )
}


