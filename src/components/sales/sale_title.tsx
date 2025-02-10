"use client"

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Office } from '@/types/Office';
import { useRouter } from 'next/navigation';

export default function SaleTitle({isOffice, offices}: {
  isOffice: boolean;
  offices: Office[]
}) {
  const router = useRouter();
  return (
    <>
    <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">営業一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {isOffice?<DropdownMenu>
            <DropdownMenuTrigger
              className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-[#0054ac] focus-visible:outline focus-visible:outline-2"
            >営業追加</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>店舗を選択してください</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                offices.map((office, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => router.push(`/sales/add?office_id=${office.id}`)}
                  >{office.name}</DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>:
          <button
            onClick={() => router.push(`/sales/add`)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            営業追加
          </button>}
        </div>
      </div>
    </>
  )
}
