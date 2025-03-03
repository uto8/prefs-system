"use client"

import React, { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { deleteOrder, deleteOrderCheck, getOrders } from './actions';
import { useAppDispatch, useAppSelector } from '@/stores';
import { removeOrder, removeOrderCheck, setOrder } from '@/stores/reducers/orderReducer';
import { format } from 'date-fns';
import { Order } from "@/types/Order"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function OrderTab({
  handleOpenOrderCheckForm,
  setEditOrderFormOpen,
  setEditOrderFormDefault,
}: {
  handleOpenOrderCheckForm: (orderId: number) => void;
  setEditOrderFormOpen: Dispatch<SetStateAction<boolean>>
  setEditOrderFormDefault: Dispatch<Order | null>
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

  const handleDeleteCheck = async (id: number, checkId: number) => {
    const result: boolean = confirm("本当に削除しますか？")
    if(result){
      await deleteOrderCheck(checkId)
      dispatch(removeOrderCheck({orderId: id, orderCheckId: String(checkId)}))
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const fetch = async () => {
      try{
        const ordersRes = await getOrders(searchParams.get("issue_id") ?? "");

        dispatch(setOrder(ordersRes))

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
              <div className="mt-1 text-xs leading-5 text-gray-500">{order.withdrawalPlanDate?format(order.withdrawalPlanDate, "yyyy年MM月dd日"):'未定'}</div>
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
            {order.orderChecks?.map((orderCheck, index) => (
                <div className="mb-5 flex" key={index}>
                  <div>
                    <div className="text-sm leading-6 text-gray-900">{Number(orderCheck.orderCheckValue)}円</div>
                    <div className="mt-1 text-xs leading-5 text-gray-500">{orderCheck.orderCheckDate?format(orderCheck.orderCheckDate, "yyyy年MM月dd日"):'未定'}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[grey]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={()=>{handleDeleteCheck(Number(order.id) ,Number(orderCheck.id))}}>
                    削除
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
              <span className="rounded-md py-1 px-2 text-xs bg-blue-50 text-blue-700 font-medium ring-1 ring-inset">
                {order.type}
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
                <button
                  onClick={()=>{setEditOrderFormOpen(true); setEditOrderFormDefault(order)}}
                  className="text-sm mr-2 font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  編集
                </button>
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
