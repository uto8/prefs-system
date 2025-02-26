"use server"

import CreateIssueForm from '@/components/issues/createIssueForm/create-issue-form'
import React from 'react'
import ApiGet from '@/lib/useApi/get'
import { Office } from '@/types/Office'
import { Sale } from '@/types/Sale'

export default async function Page() {
  const offices: Office[] = await ApiGet('/offices')
  const sales: Sale[] = await ApiGet('/sales')
  return (
    <CreateIssueForm offices={offices} sales={sales}/>
  )
}
