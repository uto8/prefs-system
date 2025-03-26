"use client";

import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { format } from 'date-fns';
import { deletePayment, deletePaymentCheck } from './actions';
import { removePayment, removePaymentCheck, setPayment } from '@/stores/reducers/paymentReducer';
import { useAppDispatch, useAppSelector } from '@/stores';
import { Payment } from '@/types/Payment';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import ApiGet from '@/lib/useApi/get';
import { DataPagination } from '@/components/layout/pagenation';

export default function Deposit({handleOpenPaymentCheckForm, setEditPaymentFormOpen, setEditPaymentFormDefault}:{
  handleOpenPaymentCheckForm: (paymentId: number) => void;
  setEditPaymentFormOpen: Dispatch<SetStateAction<boolean>>;
  setEditPaymentFormDefault: Dispatch<SetStateAction<Payment|null>>;
}) {
  const [payments, setPayments] = useState<{ data: Payment[]; totalCount: number } | null>(null);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = Number(page) || 1;
  const LIMIT = 20;
  const offset = (currentPage - 1) * LIMIT;
  const [loading, setLoading] = useState(true);

  const issueId = searchParams.get("issue_id") ?? ""

  const { value: paymentsState } = useAppSelector((state) => state.payments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const paymentsRes = await ApiGet(`/payments?limit=${LIMIT}&offset=${offset}`, {"issueId": issueId})
        setPayments(paymentsRes)
        dispatch(setPayment(paymentsRes.data))
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  const handleDelete = async (paymentId: number) => {
    const result: boolean = confirm('削除しますか');
    if(result){
      await deletePayment(paymentId)
      dispatch(removePayment(paymentId))
    }
  }

  const handleDeleteCheck = async (paymentId: number, checkId: number) => {
    const result: boolean = confirm('削除しますか');
    if(result){
      await deletePaymentCheck(checkId)
      dispatch(removePaymentCheck({paymentId: paymentId, paymentCheckId: String(checkId)}))
    }
  }
  const totalPages = payments ? Math.ceil(payments.totalCount / LIMIT) : 1;

  return (
    <>
    {loading ? (
      <></>
    ) : (
    <>
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
              入金種別
              {/* <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" /> */}
            </th>
            <th>入金予定</th>
            <th>入金確認</th>
          </tr>
        </Fragment>
        {paymentsState.map((payment, index) => (
          <tr key={index}>
            <td className="align-baseline relative py-5 pr-6">
              <div className="flex gap-x-6">
                <div className="flex-auto">
                  <div className="gap-x-3">
                    <div className="text-x font-medium leading-4 text-gray-900">
                      {payment.type}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-full h-px bg-gray-100" />
              <div className="w-full absolute bottom-0 left-0 h-px bg-gray-100" />
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
              <div className="text-sm leading-6 text-gray-900 flex justify-between">
                <div>{`${payment.paymentPlanValue}`}円</div>
              </div>
              <div className="mt-1 text-xs leading-5 text-gray-500">入金予定日：{format(payment.paymentPlanDate, "yyyy年MM月dd日")}</div>
              <div className="mt-1 text-xs leading-5 text-gray-500">請求日：{format(payment.billingDate, "yyyy年MM月dd日")}</div>
            </td>
            <td className="align-baseline hidden py-5 pr-6 sm:table-cell">
            {payment.paymentChecks.map((paymentCheck, index) => (
                <div className="mb-5 flex" key={index}>
                  <div>
                    <div className="text-sm leading-6 text-gray-900">{`${paymentCheck.paymentCheckValue}`}円</div>
                    <div className="mt-1 text-xs leading-5 text-gray-500">{format(paymentCheck.paymentCheckDate, "yyyy年MM月dd日")}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[grey]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={()=>{handleDeleteCheck(Number(payment.id) ,Number(paymentCheck.id))}}>
                    削除
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </td>
            <td className="align-baseline py-5 text-right">
              <div className="flex justify-end">
                <button
                  onClick={()=>{handleOpenPaymentCheckForm(payment.id)}}
                  className="text-sm font-medium mr-2 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  入金確認
                </button>
                <button
                  onClick={()=>{setEditPaymentFormDefault(payment); setEditPaymentFormOpen(true)}}
                  className="text-sm font-medium mr-2 leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  編集
                </button>
                <button
                  onClick={()=>{handleDelete(payment.id)}}
                  className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  削除
                  <span className="sr-only">
                    , invoice #{payment.id}
                  </span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table></>)}
    {payments && LIMIT < payments.totalCount && (
      <DataPagination currentPage={currentPage} totalPages={totalPages} link="payment" query='&type=deposit' />
    )}
    </>
  )
}
