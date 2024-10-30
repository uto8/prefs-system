'use client'

import { Fragment, useEffect, useState } from "react"
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReceiptPage() {
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setType(searchParams.get("type"));
  }, []);


  const tabs = [
    { name: '入金一覧', href: '/payment/list?type=deposit', icon: UserIcon, current: type=='deposit' },
    { name: '発注一覧', href: '/payment/list?type=payment', icon: BuildingOfficeIcon, current: type=='payment' },
  ]


  const [open, setOpen] = useState(false)
  const [depositOpen, setDepositOpen] = useState(false)
  const [addPaymentOpen, setaddPaymentOpen] = useState(false)
  const [paymentOpen, setPaymenttOpen] = useState(false)


  const stats = [
    { name: 'トータル売上', stat: `1000円`, sub: '利益', price: `${1000 - 100 * 0.2 - 100 * 0.5}円` },
  ]

  const deposits = [
    {
      id: '1111',
      type: "契約金",
      estimated_price: '5000000',
      scheduled_date: '2022年3月20日',
      deposits: [
        {
          deposit_amount: '5000000',
          deposit_date: '2022年3月20日'
        },
      ],
    },
    {
      id: '1111',
      type: "着手",
      estimated_price: '5000000',
      scheduled_date: '2022年3月20日',
      deposits: [
        {
          deposit_amount: '4900000',
          deposit_date: '2022年3月20日'
        },
        {
          deposit_amount: '100000',
          deposit_date: '2022年3月21日'
        },
      ],
    },
    {
      id: '1111',
      type: "完工金",
      estimated_price: '6000000',
      scheduled_date: '2022年5月20日',
      deposits: [
        {
          deposit_amount: '4900000',
          deposit_date: '2022年5月20日'
        },
      ],
    }
  ]

  const payments = [
    {
      id: '1111',
      supplier: "塗装業者",
      estimated_price: '5000000',
      scheduled_date: '2022年3月20日',
      deposits: [
        {
          deposit_amount: '5000000',
          deposit_date: '2022年3月20日'
        },
      ],
    },
    {
      id: '1111',
      supplier: "床工事業者",
      estimated_price: '5000000',
      scheduled_date: '2022年3月20日',
      deposits: [
        {
          deposit_amount: '4900000',
          deposit_date: '2022年3月20日'
        },
        {
          deposit_amount: '100000',
          deposit_date: '2022年3月21日'
        },
      ],
    },
    {
      id: '1111',
      supplier: "建築ホール",
      estimated_price: '6000000',
      scheduled_date: '2022年5月20日',
      deposits: [
        {
          deposit_amount: '4900000',
          deposit_date: '2022年5月20日'
        },
      ],
    }
  ]

  return (
    <>
      <div>
        <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">売上管理</h1>
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
        {type=='deposit'&&
          <button
            onClick={()=>{setOpen(true)}}
            className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          入金追加
          </button>}
          {type=='payment'&&
          <button
            onClick={()=>{setaddPaymentOpen(true)}}
            className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          発注追加
          </button>}
        </div>

      <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
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

      {type=='deposit'&&<table className="w-full text-left">
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
                <th scope="colgroup" className="relative isolate py-2 font-semibold">
                  入金種別
                  {/* <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" /> */}
                </th>
                <th>入金予定</th>
                <th>入金確認</th>
              </tr>
            </Fragment>
            {deposits.map((receipt, index) => (
              <tr key={index}>
                <td className="align-baseline relative py-5 pr-6">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="gap-x-3">
                        <div className="text-x font-medium leading-4 text-gray-900">
                          {receipt.type}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                </td>
                <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
                  <div className="text-sm leading-6 text-gray-900">{receipt.estimated_price}円</div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">{receipt.scheduled_date}</div>
                </td>
                <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
                {receipt.deposits.map((deposit, index) => (
                    <div className="mb-5" key={index}>
                      <div className="text-sm leading-6 text-gray-900">{deposit.deposit_amount}円</div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">{deposit.deposit_date}</div>
                    </div>
                  ))}
                </td>
                <td className="align-baseline py-5 text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={()=>{setDepositOpen(true)}}
                      className="text-sm font-medium mr-2 leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      入金確認
                    </button>
                    <button
                      onClick={()=>{alert("本当に削除しますか？")}}
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      削除
                      <span className="sr-only">
                        , invoice #{receipt.id}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}


        {type=='payment'&&<table className="w-full text-left">
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
                <th scope="colgroup" className="relative isolate py-2 font-semibold">
                  発注種別
                  {/* <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" /> */}
                </th>
                <th>発注予定</th>
                <th>発注確認</th>
                <th>ステータス</th>
              </tr>
            </Fragment>
            {payments.map((receipt, index) => (
              <tr key={index}>
                <td className="align-baseline relative py-5 pr-6">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="gap-x-3">
                        <div className="text-x font-medium leading-4 text-gray-900">
                          {receipt.supplier}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                </td>
                <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
                  <div className="text-sm leading-6 text-gray-900">{receipt.estimated_price}円</div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">{receipt.scheduled_date}</div>
                </td>
                <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
                {receipt.deposits.map((deposit, index) => (
                    <div className="mb-5" key={index}>
                      <div className="text-sm leading-6 text-gray-900">{deposit.deposit_amount}円</div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">{deposit.deposit_date}</div>
                    </div>
                  ))}
                </td>
                <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
                  <span className="rounded-md py-1 px-2 text-xs bg-blue-50 text-blue-700 font-medium ring-1 ring-inset">
                    打診中
                  </span>
                </td>
                <td className="align-baseline py-5 text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={()=>{setPaymenttOpen(true)}}
                      className="text-sm font-medium mr-2 leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      支払い完了
                    </button>
                    <button
                      onClick={()=>{setaddPaymentOpen(true)}}
                      className="text-sm mr-2 font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      編集
                      <span className="sr-only">
                        , invoice #{receipt.id}
                      </span>
                    </button>
                    <button
                      onClick={()=>{alert("本当に削除しますか？")}}
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      削除
                      <span className="sr-only">
                        , invoice #{receipt.id}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}

      </div>
      {/* 入金追加ポップアップ */}
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
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">種別</label>
                <select
                  name=""
                  id=""
                  className="w-full py-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="">契約金</option>
                  <option value="">着手金</option>
                  <option value="">中間金1</option>
                  <option value="">中間金2</option>
                  <option value="">中間金3</option>
                  <option value="">完工金</option>
                </select>
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金額</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金予定日</label>
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
                入金追加
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    {/* 入金確認ポップアップ */}
      <Dialog open={depositOpen} onClose={setDepositOpen} className="relative z-10">
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
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">種別</label>
                <div>契約金</div>
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金確認額</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金確認日</label>
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
                入金確認
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    {/* 発注追加ポップアップ */}
    <Dialog open={addPaymentOpen} onClose={setaddPaymentOpen} className="relative z-10">
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
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">発注先</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">発注額</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金予定日</label>
                <input
                  type="date"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">種別</label>
                <select
                  name=""
                  id=""
                  className="w-full py-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="">未処理</option>
                  <option value="">打診中</option>
                  <option value="">エビ待</option>
                  <option value="">依頼中</option>
                  <option value="">依頼済</option>
                  <option value="">発注済</option>
                  <option value="">請求済</option>
                  <option value="">済IV無</option>
                  <option value="">自社</option>
                  <option value="">現金</option>
                </select>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                発注追加
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    {/* 発注追加ポップアップ */}
    <Dialog open={addPaymentOpen} onClose={setaddPaymentOpen} className="relative z-10">
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
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">発注先</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">発注額</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金予定日</label>
                <input
                  type="date"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">種別</label>
                <select
                  name=""
                  id=""
                  className="w-full py-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="">未処理</option>
                  <option value="">打診中</option>
                  <option value="">エビ待</option>
                  <option value="">依頼中</option>
                  <option value="">依頼済</option>
                  <option value="">発注済</option>
                  <option value="">請求済</option>
                  <option value="">済IV無</option>
                  <option value="">自社</option>
                  <option value="">現金</option>
                </select>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                発注追加
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    {/* 発注確認ポップアップ */}
    <Dialog open={paymentOpen} onClose={setPaymenttOpen} className="relative z-10">
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
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">発注先</label>
                <div>塗装業者</div>
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金確認額</label>
                <input
                  type="text"
                  id="text"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">入金確認日</label>
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
                入金確認
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  )
}
