"use client"

import { DataPagination } from "@/components/layout/pagenation";
import ReceptionTitle from "@/components/receptions/reception-title";
import ReceptionListTable from "@/components/receptions/receptionListTable/reception-list-table";
import ApiGet from "@/lib/useApi/get";
import { Office } from "@/types/Office";
import { Reception } from "@/types/Reception";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReceptionList() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = Number(page) || 1;
  const LIMIT = 20;
  const offset = (currentPage - 1) * LIMIT;

  const [receptions, setReceptions] = useState<{ data: Reception[]; totalCount: number } | null>(null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // sales, offices, session を並列で取得
        const [receptionsData, officesData] = await Promise.all([
          ApiGet(`/receptions?limit=${LIMIT}&offset=${offset}`),
          ApiGet("/offices"),
        ]);
        console.log(receptionsData)

        setReceptions(receptionsData);
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
  const totalPages = receptions ? Math.ceil(receptions.totalCount / LIMIT) : 1;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ReceptionTitle isOffice={isOffice} offices={offices}/>
      <div className="mt-8 flow-root">
        {loading ? (
          <></>
        ) : (
        <>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <ReceptionListTable receptions={receptions?.data ?? []} />
              {receptions && LIMIT < receptions.totalCount && (
                <DataPagination currentPage={currentPage} totalPages={totalPages} link="receptions" />
              )}
            </div>
          </div>
        </>)}
      </div>
    </div>
  );
}
