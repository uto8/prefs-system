'use client'

import { useEffect, useState } from "react"
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/20/solid'
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
import RepairCheckForm from "@/components/repairs/repair_check_form"
import RepairForm from "@/components/repairs/repair_form"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReceiptPage() {
  const [type, setType] = useState<string | null>(null);
  const [issueId, setIssueId] = useState<string | null>("0");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [repairId, setRepairId] = useState<number | null>(null);
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

  const handleOpenRepairCheckForm = (repairId: number) => {
    setRepairId(repairId)
    setRepairConfirmOpen(true)
  }


  const tabs = [
    { name: '入金一覧', href: issueId ?`/payment/list?type=deposit&issue_id=${issueId}`: `/payment/list?type=deposit` , icon: UserIcon, current: type=='deposit' },
    { name: '発注一覧', href: issueId ?`/payment/list?type=payment&issue_id=${issueId}`: `/payment/list?type=payment`, icon: BuildingOfficeIcon, current: type=='payment' },
    { name: '補修一覧', href: issueId ?`/payment/list?type=repair&issue_id=${issueId}`: `/payment/list?type=repair`, icon: BuildingOfficeIcon, current: type=='repair' },
  ]


  const [open, setOpen] = useState(false)
  const [repairOpen, setRepairOpen] = useState(false)
  const [depositOpen, setDepositOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false)
  const [repairConfirmOpen, setRepairConfirmOpen] = useState(false)

  const router = useRouter()
  const { toast } = useToast()


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
            onClick={()=>{
              if (issueId) {
                setOpen(true);
              } else {
                toast({
                  variant: "destructive",
                  title: "案件を指定してください",
                })
                router.push('/issues/list');
              }
            }}
            className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          入金追加
          </button>}
          {type=='payment'&&
          <button
            onClick={()=>{
              if (issueId) {
                setPaymentOpen(true)
              } else {
                toast({
                  variant: "destructive",
                  title: "案件を指定してください",
                })
                router.push('/issues/list');
              }
            }}
            className="block inline rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          発注追加
          </button>}
          {type=='repair'&&
          <button
            onClick={()=>{
              if (issueId) {
                setRepairOpen(true)
              } else {
                toast({
                  variant: "destructive",
                  title: "案件を指定してください",
                })
                router.push('/issues/list');
              }
            }}
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
          handleOpenRepairCheckForm={handleOpenRepairCheckForm}
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

      <RepairCheckForm
        repairConfirmOpen={repairConfirmOpen}
        setRepairConfirmOpen={setRepairConfirmOpen}
        repairId={repairId ?? 0}
      />

      {/* 入金フォームポップアップ */}
      <PaymentForm open={open} setOpen={setOpen}/>

      {/* 発注追加ポップアップ */}
      <OrderForm paymentOpen={paymentOpen} setPaymentOpen={setPaymentOpen}/>

      {/* 補修追加ポップアップ */}
      <RepairForm repairOpen={repairOpen} setRepairOpen={setRepairOpen}/>
    </>
  )
}
