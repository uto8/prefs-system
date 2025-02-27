'use server';

import { auth } from '@/auth';
import { getSaleById } from './actions';
import TitleComponent from '@/components/layout/title';
import EditSaleForm from '@/components/sales/editSaleForm/edit-sale-form';
import ApiGet from '@/lib/useApi/get';
import { OptionFields } from '@/components/ui/select-field';
import { Office } from '@/types/Office';

export default async function Page(
  props: {
    params: Promise<{ id: string }>
  }
) {

  const params = await props.params;
  const { id } = params;
  const [sale, offices] = await Promise.all([
    getSaleById(id),
    ApiGet('/offices'),
  ]);

  const officeOption: OptionFields = offices.map((office: Office) => {return {value: office.id, label: office.name}})
  const session = await auth();
  const saleId: string | null = session?.user.saleId? String(session?.user.saleId): null

  return (
    <>
      <TitleComponent title="営業編集"/>
      <EditSaleForm
        sale={sale}
        offices={officeOption}
        userSaleId={saleId}/>
    </>
  )
}
