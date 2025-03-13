'use server';

import { auth } from '@/auth';
import { getReceptionById } from './actions';
import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get';
import { OptionFields } from '@/components/ui/select-field';
import { Office } from '@/types/Office';
import EditReceptionForm from '@/components/receptions/editReceptionForm/edit-reception-form';

export default async function Page(
  props: {
    params: Promise<{ id: string }>
  }
) {

  const params = await props.params;
  const { id } = params;
  const [reception, offices] = await Promise.all([
    getReceptionById(id),
    ApiGet('/offices'),
  ]);

  const officeOption: OptionFields = offices.map((office: Office) => {return {value: office.id, label: office.name}})
  const session = await auth();
  const receptionId: string | null = session?.user.officeId? String(session?.user.officeId): null

  return (
    <>
      <TitleComponent title="受付編集"/>
      <EditReceptionForm
        reception={reception}
        offices={officeOption}
        userOfficeId={receptionId}/>
    </>
  )
}
