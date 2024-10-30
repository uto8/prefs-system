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
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'

export default function IssueList() {

  const [open, setOpen] = useState(false)
  const [editModal, setEditModal] = useState(false)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">案件一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={()=>setOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <a
          href='/issues/add'
          className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        案件追加
        </a>
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
                {issues.map((issue, index) => (
                  <tr key={issue.no}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {issue.no}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.clientName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.clientAddress}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {index != 3?<span className="rounded-md py-1 px-2 text-xs bg-blue-50 text-blue-700 font-medium ring-1 ring-inset">
                        契約金入金
                      </span>:<span className="rounded-md py-1 px-2 text-xs bg-red-50 text-red-700 ring-red-600/20 font-medium ring-1 ring-inset">
                      完工金未入金
                      </span>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{issue.sales}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="/payment/list?type=deposit" className="text-indigo-600 hover:text-indigo-900">
                        入金
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="/list?type=payment" className="text-indigo-600 hover:text-indigo-900">
                        発注
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button onClick={()=>{setEditModal(true)}} className="text-indigo-600 hover:text-indigo-900">
                        契約
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 検索ポップアップ */}
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
    {/* 検索ポップアップ */}
    {/* 案件編集ポップアップ */}
    <Dialog open={editModal} onClose={setEditModal} className="relative z-10">
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
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">工事住所</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">契約日</label>
                <input
                  type="date"
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
                案件編集
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    {/* 案件編集ポップアップ */}
    </div>
  )
}
