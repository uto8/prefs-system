"use client"

import React, { useEffect, useState } from 'react'
import ApiGet from '@/lib/useApi/get'
import { OptionFields } from '../ui/select-field'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  CategoryScale,  // ← これが "category" スケール
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement
} from 'chart.js';

type DataSets = {
  issueMonth: string;
  issueCount: number;
}[]

export default function RevenuList({
  offices
}: {
  offices: OptionFields
}) {
  const [selectedMetric, setSelectedMetric] = React.useState("案件数");
  const [selectedYear, setSelectedYear] = React.useState(2025);
  const [officeId, setOfficeId] = React.useState<string>(offices.length > 0 ? offices[0].value : "");
  const [data, setData] = React.useState<DataSets>([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  );

  const [loading, setLoading] = useState(false)

  const metrics = [
    "案件数",
    "契約数",
    "契約額",
    "入金額",
    "売上",
    "出金額",
    "粗利",
    "平均単価",
    "自社工事売上",
    "予定出金額",
    "予定入金額",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(selectedMetric === "案件数") {
          const res = await ApiGet(`/revenu_calendars/issues_count?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`,{
            officeId: officeId
          })
          setData(res[0].data);
        } else if(selectedMetric === "契約数") {
          const res = await ApiGet(`/revenu_calendars/issue_confirms_count?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if(selectedMetric === "契約額") {
          const res = await ApiGet(`/revenu_calendars/total_contract_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if(selectedMetric === "入金額") {
          const res = await ApiGet(`/revenu_calendars/total_payment_check_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if (selectedMetric === "売上") {
          const res = await ApiGet(`/revenu_calendars/total_revenu_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if (selectedMetric === "出金額") {
          const res = await ApiGet(`/revenu_calendars/total_order_check_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if( selectedMetric === "粗利") {
          const res = await ApiGet(`/revenu_calendars/total_profit_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if(selectedMetric === "平均単価") {
          const res = await ApiGet(`/revenu_calendars/average_profit?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if(selectedMetric === "自社工事売上") {
          const res = await ApiGet(`/revenu_calendars/own_total_order_check_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if(selectedMetric === "予定出金額") {
          const res = await ApiGet(`/revenu_calendars/total_order_plan_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        } else if(selectedMetric === "予定入金額") {
          const res = await ApiGet(`/revenu_calendars/total_payment_plan_value?fromDate=${selectedYear}-01-01&toDate=${selectedYear}-12-31`, {
            officeId: officeId
          });
          setData(res[0].data);
        }
      }catch(e){
        console.error("データの取得に失敗しました", e);
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    fetchData();
  }, [selectedMetric, selectedYear, officeId]);

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            データ管理システム
          </h1>

          <div className='flex'>
            {/* 年度選択 */}
            <div className="flex items-center mb-4 mr-4">
              <label className="text-sm font-medium text-gray-700">年度:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value={2023}>2023年</option>
                <option value={2024}>2024年</option>
                <option value={2025}>2025年</option>
              </select>
            </div>
            {/* 年度選択 */}
            <div className="flex items-center mb-4">
              <label className="text-sm font-medium text-gray-700">検索：</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value={"合算"}>合算</option>
                <option value={"別元請"}>別元請</option>
                <option value={"SOTORIE"}>SOTORIE</option>
              </select>
            </div>
            {/* 店舗選択 */}
            <div className="flex items-center mb-4">
              <label className="text-sm font-medium text-gray-700">店舗：</label>
              <select
                value={officeId}
                onChange={(e) => setOfficeId(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">全店舗</option>
                {offices.map((office) => (
                  <option key={office.value} value={office.value}>
                    {office.label}
                  </option>
                ))}
              </select>
            </div>
          </div>



          {/* メトリクス選択 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {metrics.map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedMetric === metric
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        {
          loading?<div className="flex justify-center" aria-label="読み込み中">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>:<MainComponent data={data} selectedMetric={selectedMetric} selectedYear={selectedYear} />
        }
    </>
  )

  if(loading) {
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

}

type Props = {
  data: DataSets;
  selectedMetric: string;
  selectedYear: number;
};

function MainComponent({data, selectedMetric, selectedYear}: Props) {
  console.log("datamaincomponent", data)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">

        {/* グラフエリア */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedMetric} - {selectedYear}年
          </h2>

          {/* 棒グラフ */}
          <div className="relative">
            <Line
              datasetIdKey='id'
              data={{
                labels: data.map(item => item.issueMonth),
                datasets: [
                  {
                    borderColor: 'rgba(75, 192, 192, 1)', // 線の色
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // 点の背景
                    label: '',
                    data: data.map(item => item.issueCount),
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    min: 0,
                    ticks: {
                      stepSize: 1,
                    },
                    title: {
                      display: true,
                      text: '件数',
                    },
                  },
                }}
              }
            />
          </div>

          {/* データテーブル */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">
                    月
                  </th>
                  {data.map((month, index) => (
                    <th
                      key={index}
                      className="text-center py-2 px-3 font-medium text-gray-700"
                    >
                      {month.issueMonth}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium text-gray-700">
                    {selectedMetric}
                  </td>
                  {data.map((value, index) => (
                    <td
                      key={index}
                      className="text-center py-2 px-3 text-gray-600"
                    >
                      {value.issueCount}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 統計情報 */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500">合計</h3>
            <p className="text-2xl font-bold text-gray-800">
              {currentData.reduce((sum, val) => sum + val, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500">平均</h3>
            <p className="text-2xl font-bold text-gray-800">
              {Math.round(
                currentData.reduce((sum, val) => sum + val, 0) / 12
              ).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500">最大値</h3>
            <p className="text-2xl font-bold text-gray-800">
              {Math.max(...currentData).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500">最小値</h3>
            <p className="text-2xl font-bold text-gray-800">
              {Math.min(...currentData).toLocaleString()}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

