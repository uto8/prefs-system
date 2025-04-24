import React from 'react'
import TitleComponent from '@/components/layout/title'
import ApiGet from '@/lib/useApi/get'
import { formatNumber } from '@/lib/format_number';

export default async function Revenue() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const reorderedMonths: string[] = [];

  // 1年前から現在までの年月を作成
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const yearOffset = Math.floor((currentMonth - i) / 12);
    const year = currentYear + yearOffset;
    reorderedMonths.push(`${year}年${months[monthIndex]}`);
  }

  const issuesCount: {officeName: string; data: {month: string; totalPaymentCheckValue: number; }[]}[] = await ApiGet("/revenu_calendars/total_payment_check_value")

  return (
    <div>
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <TitleComponent title="入金額"/>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"></th>
              {reorderedMonths.map((month, index) => (
                <th key={index} scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {issuesCount.map((issue, index) => {
              const issuesMap = issue.data.reduce<{ [key: string]: number }>((acc, { month, totalPaymentCheckValue }) => {
                acc[month] = totalPaymentCheckValue;
                return acc;
              }, {});
              return <tr key={index} className="divide-x divide-gray-200">
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900">
                  {issue.officeName}
                </td>
                {reorderedMonths.map((month, monthIndex) => {
                  // 月の文字列を"YYYY年MM月"形式から"YYYY-MM"形式に変換
                  const formattedMonth = month
                    .replace('年', '-')
                    .replace('月', '')
                    .replace(/-(\d)$/g, '-0$1'); // 月部分が1桁の場合に先頭にゼロを追加

                  const issueCount = issuesMap[formattedMonth] || null;
                  return (
                    <td key={monthIndex} className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">
                      {formatNumber(issueCount)}
                    </td>
                  );
                })}
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
