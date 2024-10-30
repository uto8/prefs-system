'use client'
const issues = [
  {no: 1111, clientName: 'Aさん', clientAddress: '愛知県名古屋市中川区', status: '大阪店', sales: '営業Aさん'},
  {no: 2222, clientName: 'Bさん', clientAddress: '愛知県名古屋市中川区', status: '名古屋店', sales: '営業Bさん'},
  {no: 3333, clientName: 'Cさん', clientAddress: '愛知県名古屋市中川区', status: '横浜店', sales: '営業Cさん'},
  {no: 4444, clientName: 'Dさん', clientAddress: '愛知県名古屋市中川区', status: '東京店', sales: '営業Dさん'},
  {no: 5555, clientName: 'Eさん', clientAddress: '愛知県名古屋市中川区', status: '大阪店', sales: '営業Eさん'},
  {no: 6666, clientName: 'Fさん', clientAddress: '愛知県名古屋市中川区', status: '大阪店', sales: '営業Fさん'},
  {no: 7777, clientName: 'Gさん', clientAddress: '愛知県名古屋市中川区', status: '横浜店', sales: '営業Gさん'},
  {no: 8888, clientName: 'Hさん', clientAddress: '愛知県名古屋市中川区', status: '名古屋店', sales: '営業Hさん'},
  {no: 9999, clientName: 'Iさん', clientAddress: '愛知県名古屋市中川区', status: '大阪店', sales: '営業Iさん'},
]

export default function IssueList() {

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">営業一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            href="/sales/add"
            className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-[#0054ac] focus-visible:outline focus-visible:outline-2"
          >
            営業追加
          </a>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    営業番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    営業名
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    住所
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    店舗
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {issues.map((issue) => (
                  <tr key={issue.no}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {issue.no}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.clientName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.clientAddress}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.status}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="/sales/1/edit" className="text-indigo-600 hover:text-indigo-900">
                        編集
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
