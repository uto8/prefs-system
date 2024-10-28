'use client'

import { Fragment } from "react"
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/20/solid'

const tabs = [
  { name: '入金一覧', href: '#', icon: UserIcon, current: true },
  { name: '出金一覧', href: '#', icon: BuildingOfficeIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReceiptPage() {


  const stats = [
    { name: 'トータル売上', stat: `1000円`, sub: '利益', price: `${1000 - 100 * 0.2 - 100 * 0.5}円` },
  ]

  // const value: unknown[] = []

  return (
    <>
      <div>
        <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">売上管理</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 flex">
          {/* <input
            value={dayjs(date).format('YYYY-MM')}
            onChange={(e) => setDate(dayjs(e.target.value, 'YYYY-MM').toDate())}
            type="month" className="mr-[20px] w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          /> */}
          <button
            // onClick={handleSearch}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          </button>
        </div>
      </div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">案件番号</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 mb-6">1111</dd>
              <dd className="truncate text-sm font-medium text-gray-500">担当者：Aさん</dd>
              <dd className="truncate text-sm font-medium text-gray-500">住所：愛知県名古屋市中川区</dd>
            </div>
          ))}
        </dl>
        <div className="flex justify-end">
        <a
              href="/casts/add"
              className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            入金追加
            </a>
        </div>

        <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        {/* <select
          id="tabs"
          name="tabs"
          defaultValue={tabs.find((tab) => tab.current).name}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select> */}
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                aria-current={tab.current ? 'page' : undefined}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>

        <table className="w-full text-left">
          <thead className="sr-only">
            <tr>
              <th>Amount</th>
              <th className="hidden sm:table-cell">Client</th>
              <th>More details</th>
            </tr>
          </thead>
          <tbody>
            <Fragment>
              <tr className="text-sm leading-6 text-gray-900">
                <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                  購入履歴
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                </th>
              </tr>
            </Fragment>
            {/* {value.map((receipt, index) => (
              <tr key={index}>
                <td className="relative py-5 pr-6">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-xl font-medium leading-6 text-gray-900">
                          ¥{receipt.price}
                        </div>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">{receipt.packName} {receipt.count}パック</div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">{`${(receipt.createdAt)}`}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                </td>
                <td className="hidden py-5 pr-6 sm:table-cell">
                  <div className="text-sm leading-6 text-gray-900">{receipt.purchaser}</div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">{receipt.status}</div>
                </td>
                <td className="py-5 text-right">
                  <div className="flex justify-end">
                    <a
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      取引番号
                      <span className="sr-only">
                        , invoice #{receipt.id}
                      </span>
                    </a>
                  </div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">
                    Invoice <span className="text-gray-900">#{receipt.id}</span>
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  )
}
