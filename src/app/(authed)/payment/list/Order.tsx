"use client"

import React, { Fragment, useEffect } from 'react'
import { deleteOrder, getOrders } from './actions';
import { useAppDispatch, useAppSelector } from '@/stores';
import { removeOrder, setOrder } from '@/stores/reducers/orderSlice';
import { format } from 'date-fns';

export default function Order({ handleOpenOrderCheckForm }: {
  handleOpenOrderCheckForm: (orderId: number) => void;
}) {

  const { value: orders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  const handleDelete = async (id: number) => {
    const result: boolean = confirm("本当に削除しますか？")
    if(result){
      await deleteOrder(id)
      dispatch(removeOrder(id))
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const fetch = async () => {
      try{
        const orders = await getOrders(searchParams.get("issue_id") ?? "");

        dispatch(setOrder(orders))
        console.log(orders)

      }  catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  }, []);

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
              発注種別
            </th>
            <th>発注予定</th>
            <th>発注確認</th>
            <th>ステータス</th>
          </tr>
        </Fragment>
        {orders.map((order, index) => (
          <tr key={index}>
            <td className="align-baseline relative py-5 pr-6">
              <div className="flex gap-x-6">
                <div className="flex-auto">
                  <div className="gap-x-3">
                    <div className="text-x font-medium leading-4 text-gray-900">
                      {order.supplier}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
              <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
              <div className="text-sm leading-6 text-gray-900">{Number(order.orderPlanValue)}円</div>
              <div className="mt-1 text-xs leading-5 text-gray-500">{format(order.withdrawalPlanDate, "yyyy年MM月dd日")}</div>
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
            {order.orderChecks.map((orderCheck, index) => (
                <div className="mb-5" key={index}>
                  <div className="text-sm leading-6 text-gray-900">{Number(orderCheck.orderCheckValue)}円</div>
                  <div className="mt-1 text-xs leading-5 text-gray-500">{format(orderCheck.orderCheckDate, "yyyy年MM月dd日")}</div>
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
                  onClick={()=>{handleOpenOrderCheckForm(order.id)}}
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
                    , invoice #{order.id}
                  </span>
                </button> */}
                <button
                  onClick={()=>{handleDelete(order.id)}}
                  className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  削除
                  <span className="sr-only">
                    , invoice #{order.id}
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
