"use client"

import { DataPagination } from "@/components/layout/pagenation";
import SaleTitle from "@/components/sales/sale_title";
import SaleListTable from "@/components/sales/saleListTable/sale-list-table";
import ApiGet from "@/lib/useApi/get";
import { Office } from "@/types/Office";
import { Sale } from "@/types/Sale";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function IssueList() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = Number(page) || 1;
  const LIMIT = 20;
  const offset = (currentPage - 1) * LIMIT;

  const [sales, setSales] = useState<{ data: Sale[]; totalCount: number } | null>(null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // sales, offices, session を並列で取得
        const [salesData, officesData] = await Promise.all([
          ApiGet(`/sales?limit=${LIMIT}&offset=${offset}`),
          ApiGet("/offices"),
        ]);
        console.log(salesData)

        setSales(salesData);
        setOffices(officesData);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  const isOffice = session?.user?.role === "OFFICE";
  const totalPages = sales ? Math.ceil(sales.totalCount / LIMIT) : 1;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SaleTitle isOffice={isOffice} offices={offices}/>
      <div className="mt-8 flow-root">
      {loading ? (
        <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
      ) : (
        <>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <SaleListTable sales={sales?.data ?? []} />
              {sales && LIMIT < sales.totalCount && (
                <DataPagination currentPage={currentPage} totalPages={totalPages} link="sales" />
              )}
            </div>
          </div>
        </>)}
      </div>
    </div>
  );
}
