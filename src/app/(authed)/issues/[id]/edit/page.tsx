
import TitleComponent from '@/components/layout/title';
import { Suspense } from 'react';
import ApiGet from '@/lib/useApi/get';
import Loading from '@/components/layout/loading';
import EditIssueForm from '@/components/issues/editIssueForm/edit-issue-form';
import { OptionFields } from '@/components/ui/select-field';
import { Office } from '@/types/Office';
import { Sale } from '@/types/Sale';
import { auth } from '@/auth';
import { Reception } from '@/types/Reception';

export default async function Page(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  const { id } = params;
  const [offices, sales, receptions, issue] = await Promise.all([
    ApiGet('/offices'),
    ApiGet('/sales'),
    ApiGet('/receptions'),
    ApiGet(`/issues/${id}`)
  ]);
  const officeOption: OptionFields = offices.map((office: Office) => {return {value: office.id, label: office.name}})
  const saleOption: OptionFields = sales.data.map((sale: Sale) => {return {value: sale.id, label: sale.name}})
  const receptionOption: OptionFields = receptions.data.map((reception: Reception) => {return {value: reception.id, label: reception.name}})
  const session = await auth();
  const officeId: string | null = session?.user.officeId? String(session?.user.officeId): null
  const saleId: string | null = session?.user.saleId? String(session?.user.saleId): null
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading/>}>
        <TitleComponent title="案件編集"/>
        <EditIssueForm
          offices={officeOption}
          sales={saleOption}
          issue={issue}
          receptions={receptionOption}
          userOfficeId={officeId}
          userSaleId={saleId}
        />
      </Suspense>
    </div>
  )
}


