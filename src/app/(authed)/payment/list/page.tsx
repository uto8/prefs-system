'use client'

import { useEffect, useState } from "react"
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import Order from "./Order"
import Deposit from "./Deposit"
import Repair from "./Repair"
import { getPayments } from "./actions"
import { setPayment } from "@/stores/reducers/paymentReducer"
import { useAppDispatch } from "@/stores"
import PaymentForm from "@/components/payments/payment_form"
import PaymentCheckForm from "@/components/payments/payment_check_form"
import OrderForm from "@/components/orders/order_form"
import OrderCheckForm from "@/components/orders/order_check_form"


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReceiptPage() {
  const [type, setType] = useState<string | null>(null);
  const [issueId, setIssueId] = useState<string | null>("0");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setType(searchParams.get("type"));
    setIssueId(searchParams.get("issue_id"));

    const fetch = async () => {
      try{
        const payments = await getPayments(searchParams.get("issue_id") ?? "");

        dispatch(setPayment(payments))
        console.log(payments)

      }  catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  }, []);

  const handleOpenPaymentCheckForm = (paymentId: number) => {
    setPaymentId(paymentId)
    setDepositOpen(true)
    console.log(paymentId)
  }

  const handleOpenOrderCheckForm = (orderId: number) => {
    setOrderId(orderId)
    setOrderConfirmOpen(true)
  }


  const tabs = [
    { name: '入金一覧', href: `/payment/list?type=deposit&issue_id=${issueId}`, icon: UserIcon, current: type=='deposit' },
    { name: '発注一覧', href: `/payment/list?type=payment&issue_id=${issueId}`, icon: BuildingOfficeIcon, current: type=='payment' },
    { name: '補修一覧', href: `/payment/list?type=repair&issue_id=${issueId}`, icon: BuildingOfficeIcon, current: type=='repair' },
  ]


  const [open, setOpen] = useState(false)
  const [repairOpen, setRepairOpen] = useState(false)
  const [depositOpen, setDepositOpen] = useState(false)
  const [addPaymentOpen, setaddPaymentOpen] = useState(false)
  const [paymentOpen, setPaymenttOpen] = useState(false)
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false)


  const stats = [
    { name: 'トータル売上', stat: `1000円`, sub: '利益', price: `${1000 - 100 * 0.2 - 100 * 0.5}円` },
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
          {type=='repair'&&
          <button
            onClick={()=>{setRepairOpen(true)}}
            className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          補修追加
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

      {type=='deposit'&&<Deposit
        handleOpenPaymentCheckForm={handleOpenPaymentCheckForm}
      />}


        {type=='payment'&&<Order
          handleOpenOrderCheckForm={handleOpenOrderCheckForm}
        />}

        {type=='repair'&&<Repair
          setAddPaymentOpen={setPaymenttOpen}
          setPaymentOpen={setaddPaymentOpen}
        />}

      </div>
    <PaymentCheckForm
      depositOpen={depositOpen}
      setDepositOpen={setDepositOpen}
      paymentId={paymentId?? 0}
    />

    <OrderCheckForm
      depositOpen={orderConfirmOpen}
      setDepositOpen={setOrderConfirmOpen}
      orderId={orderId ?? 0}
    />

    {/* 入金フォームポップアップ */}
    <PaymentForm open={open} setOpen={setOpen}/>

    {/* 発注追加ポップアップ */}
    <OrderForm addPaymentOpen={addPaymentOpen} setaddPaymentOpen={setaddPaymentOpen}/>

    {/* 補修追加ポップアップ */}
    <Dialog open={repairOpen} onClose={setRepairOpen} className="relative z-10">
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
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">備考</label>
                <textarea
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
