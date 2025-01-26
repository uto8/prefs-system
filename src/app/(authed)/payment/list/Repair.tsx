"use client"

import React, { Fragment } from 'react'

export default function Repair({ setAddPaymentOpen, setPaymentOpen }: {
  setAddPaymentOpen: (open: boolean) => void;
  setPaymentOpen: (open: boolean) => void;
}) {
  const payments = [
    {
      id: '11112',
      supplier: "塗装業者2",
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
            <th scope="colgroup" className="relative isolate py-2 font-semibold">
              委託業者
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
                  onClick={()=>{setPaymentOpen(true)}}
                  className="text-sm font-medium mr-2 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  支払い完了
                </button>
                <button
                  onClick={()=>{setAddPaymentOpen(true)}}
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
    </table>
  )
}
