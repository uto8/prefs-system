"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

export default function TitleComponent({
  title
}: {title: string}) {
  const router = useRouter()

  const goBack = () => {
    router.back();  // 前のページに戻る
  };
  return (
    <div className="px-4 sm:px-0 mb-8">
        <h3 className="flex text-base/7 font-semibold text-gray-900">
            <button onClick={goBack} type="button" className="mr-2 text-gray-400 bg-transparent text-sm" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-2 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="sr-only">Back</span>
            </button>
          {title}
        </h3>
      </div>
  )
}
