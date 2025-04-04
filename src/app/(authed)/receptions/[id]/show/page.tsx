import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get'
import { Suspense } from 'react'

async function SaleDetails({ params }: { params: { id: string } }) {

  const { id } = params;
  const sale = await ApiGet(`/receptions/${id}`)
  console.log(sale)

  return (
    <div>
      <TitleComponent title="受付詳細"/>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">名前</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{sale.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">メールアドレス</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{sale.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">電話番号</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{sale.phoneNumber}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default async function SalePage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading product details...</div>}>
        <SaleDetails params={params} />
      </Suspense>
    </div>
  )
}
