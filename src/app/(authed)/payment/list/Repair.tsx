"use client"

import { useAppDispatch, useAppSelector } from '@/stores';
import React, { Fragment, useEffect } from 'react'
import { getRepairs } from './actions';
import { setRepair } from '@/stores/reducers/repairReducer';
import { format } from 'date-fns';

export default function Repair({ handleOpenRepairCheckForm }: {
  handleOpenRepairCheckForm: (repairId: number) => void;
}) {
  const { value: repairs=[] } = useAppSelector((state) => state.repairs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const fetch = async () => {
      try{
        const ordersRes = await getRepairs(searchParams.get("issue_id") ?? "");

        dispatch(setRepair(ordersRes));

      }  catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  }, [])

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
            </th>
            <th>発注予定</th>
            <th>発注確認</th>
            <th>ステータス</th>
          </tr>
        </Fragment>
        {repairs.map((repair, index) => (
          <tr key={index}>
            <td className="align-baseline relative py-5 pr-6">
              <div className="flex gap-x-6">
                <div className="flex-auto">
                  <div className="gap-x-3">
                    <div className="text-x font-medium leading-4 text-gray-900">
                      {repair.supplier}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
              <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
              <div className="text-sm leading-6 text-gray-900">{repair.repairPlanValue}円</div>
              <div className="mt-1 text-xs leading-5 text-gray-500">
                {repair.withdrawalPlanDate? format(repair.withdrawalPlanDate, 'yyyy年MM月dd日'): '日付なし' }
                </div>
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
              {repair.repairChecks.map((deposit, index) => (
                <div className="mb-5" key={index}>
                  <div className="text-sm leading-6 text-gray-900">{deposit.repairCheckValue}円</div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">
                  {deposit.repairCheckDate
                    ? format(new Date(deposit.repairCheckDate), 'yyyy年MM月dd日')
                    : '日付なし'}
                  </div>
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
                  onClick={()=>{handleOpenRepairCheckForm(repair.id)}}
                  className="text-sm font-medium mr-2 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  支払い完了
                </button>
                {/* <button
                  onClick={()=>{setAddPaymentOpen(true)}}
                  className="text-sm mr-2 font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  編集
                  <span className="sr-only">
                    , invoice #{receipt.id}
                  </span>
                </button> */}
                <button
                  onClick={()=>{alert("本当に削除しますか？")}}
                  className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  削除
                  <span className="sr-only">
                    , invoice #{repair.id}
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
