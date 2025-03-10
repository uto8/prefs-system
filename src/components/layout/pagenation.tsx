"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { current } from "@reduxjs/toolkit";

export function DataPagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem aria-disabled={1 === currentPage}>
          <PaginationPrevious href={`/issues/list/?page=${1}`} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={index} aria-disabled={page === currentPage}>
              <PaginationLink href={`/issues/list/?page=${page}`} isActive={page=== currentPage}>{page}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem aria-disabled={totalPages === currentPage}>
          <PaginationNext href={`/issues/list/?page=${totalPages}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
