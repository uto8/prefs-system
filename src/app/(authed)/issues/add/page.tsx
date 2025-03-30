"use server"

import CreateIssueForm from '@/components/issues/createIssueForm/create-issue-form'
import React from 'react'
import ApiGet from '@/lib/useApi/get'
import { Office } from '@/types/Office'
import { Sale } from '@/types/Sale'
import { OptionFields } from '@/components/ui/select-field'
import TitleComponent from '@/components/layout/title'
import { auth } from '@/auth'
import { Reception } from '@/types/Reception'

export default async function Page() {
  const [offices, sales, receptions] = await Promise.all([
    ApiGet('/offices'),
    ApiGet('/sales'),
    ApiGet('/receptions')
  ]);
  const officeOption: OptionFields = offices.map((office: Office) => {return {value: office.id, label: office.name}})
  const saleOption: OptionFields = sales.data.map((sale: Sale) => {return {value: sale.id, label: sale.name}})
  const session = await auth();
  const officeId: string | null = session?.user.officeId? String(session?.user.officeId): null
  const saleId: string | null = session?.user.saleId? String(session?.user.saleId): null
  const receptionOption: OptionFields = receptions.data.map((reception: Reception) => {return {value: reception.id, label: reception.name}})
  return (
    <>
      <TitleComponent title="案件追加"/>
      <CreateIssueForm offices={officeOption} sales={saleOption} receptions={receptionOption} userOfficeId={officeId} userSaleId={saleId}/>
    </>
  )
}
