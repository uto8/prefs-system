import TitleComponent from '@/components/layout/title';
import ApiGet from '@/lib/useApi/get'
import { Suspense } from 'react'

async function ClientDetails({ params }: { params: { id: string } }) {

  const { id } = params;
  const client = await ApiGet(`/clients/${id}`)



  return (
    <div>
      <TitleComponent title="顧客詳細"/>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">名前</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{client.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">名前(かな)</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{client.nameKana}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">メールアドレス</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{client.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">電話番号</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{client.phoneNumber}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default function clientPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading product details...</div>}>
        <ClientDetails params={params} />
      </Suspense>
    </div>
  )
}
