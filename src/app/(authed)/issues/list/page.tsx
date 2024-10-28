'use client'
const issues = [
  {no: 1111, clientName: 'Aさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Aさん'},
  {no: 2222, clientName: 'Bさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Bさん'},
  {no: 3333, clientName: 'Cさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Cさん'},
  {no: 4444, clientName: 'Dさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Dさん'},
  {no: 5555, clientName: 'Eさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Eさん'},
  {no: 6666, clientName: 'Fさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Fさん'},
  {no: 7777, clientName: 'Gさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Gさん'},
  {no: 8888, clientName: 'Hさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Hさん'},
  {no: 9999, clientName: 'Iさん', clientAddress: '愛知県名古屋市中川区', status: 'contact', sales: '営業Iさん'},
]
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'

export default function IssueList() {

  const [open, setOpen] = useState(false)
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="rounded-md bg-red-50 p-4 mb-12">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold font-medium text-red-800">予定日を超えている未入金の支払いがあります</h3>

          </div>
        </div>
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">案件一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={()=>{setOpen(true)}}
            className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-[#0054ac] focus-visible:outline focus-visible:outline-2"
          >
            案件検索
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    案件番号
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    お客様名
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    住所
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    ステータス
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    担当者
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">入金</span>
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
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.sales}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        入金
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        発注
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">案件番号</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">お客様名</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">住所</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">ステータス</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">担当者</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                検索する
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </div>
  )
}
