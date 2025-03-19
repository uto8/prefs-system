"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function DataPagination({ currentPage, totalPages, link, query="" }: { currentPage: number; totalPages: number, link: string, query?: string }) {
  // const goToPage = (page: number) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("page", page.toString());
  //   router.push(`?${params.toString()}`);
  // };

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem aria-disabled={1 === currentPage}>
          <PaginationPrevious href={`/${link}/list/?page=${1}${query}`} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={index} aria-disabled={page === currentPage}>
              <PaginationLink href={`/${link}/list/?page=${page}${query}`} isActive={page=== currentPage}>{page}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem aria-disabled={totalPages === currentPage}>
          <PaginationNext href={`/${link}/list/?page=${totalPages}${query}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
