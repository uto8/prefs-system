"use client"

import React from 'react'
import RevenuItem, { RevenuData } from './revenu-item'
import { useRouter } from 'next/navigation'

export default function RevenuList({
  revenus
}: {
  revenus: RevenuData[]
}) {
  const router = useRouter()

  const pageRouter = (title: string) => {
    if(title === "案件数"){
      router.push("/revenue/issues_count")
    }
    if(title === "契約数"){
      router.push("/revenue/issue_confirms_count")
    }
    if(title === "契約額"){
      router.push("/revenue/total_contract_value")
    }
    if(title === "入金額"){
      router.push("/revenue/total_payment_check_value")
    }
    if(title === "売上"){
      router.push("/revenue/total_revenu_value")
    }
    if(title === "出金額"){
      router.push("/revenue/total_order_check_value")
    }
    if(title === "粗利"){
      router.push("/revenue/total_profit_value")
    }
    if(title === "平均単価"){
      router.push("/revenue/average_profit")
    }
    if(title === "自社工事売上"){
      router.push("/revenue/own_total_order_check_value")
    }
    if(title === "予定出金額"){
      router.push("/revenue/total_order_plan_value")
    }
    if(title === "予定入金額"){
      router.push("/revenue/total_payment_plan_value")
    }
  }

  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {
          revenus.map((revenu: RevenuData, index: number) => {
            return <li key={index} onClick={()=> {pageRouter(revenu.title)}} className="overflow-hidden rounded-xl border border-gray-200">
              <RevenuItem data={revenu}/>
            </li>
          })
        }
      </ul>
    </div>
  )
}
