"use client";
import React, { useState } from "react";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import { PAGINATION_ITEMS_PER_PAGE } from "@/config/ui";
const PaginationCustome = ({ totalItems }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;
   const pushQuery = useHandlePushQuery();
   const totalPages = Math.floor(totalItems / itemsPerPage);

   const handlePageChange = (page) => {
      pushQuery("page", page);
      if (page >= 1 && page <= totalPages) {
         setCurrentPage(page);
      }
   };

   const renderPaginationItems = () => {
      const paginationItems = [];
      const maxPagesToShow = 3;
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

      if (totalPages <= maxPagesToShow) {
         for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
               <PaginationItem key={i}>
                  <PaginationLink
                     isActive={i === currentPage}
                     onClick={() => handlePageChange(i)}
                  >
                     {i}
                  </PaginationLink>
               </PaginationItem>
            );
         }
      } else {
         if (currentPage > 1) {
            paginationItems.push(
               <PaginationItem key={1}>
                  <PaginationLink
                     isActive={1 === currentPage}
                     onClick={() => handlePageChange(1)}
                  >
                     1
                  </PaginationLink>
               </PaginationItem>
            );
         }

         if (currentPage > halfMaxPagesToShow + 1) {
            paginationItems.push(
               <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
               </PaginationItem>
            );
         }

         const startPage = Math.max(2, currentPage - halfMaxPagesToShow);
         const endPage = Math.min(
            totalPages - 1,
            currentPage + halfMaxPagesToShow
         );

         for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
               <PaginationItem key={i}>
                  <PaginationLink
                     className="text-xs"
                     isActive={i === currentPage}
                     onClick={() => handlePageChange(i)}
                  >
                     {i}
                  </PaginationLink>
               </PaginationItem>
            );
         }

         if (currentPage < totalPages - halfMaxPagesToShow) {
            paginationItems.push(
               <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis />
               </PaginationItem>
            );
         }

         if (currentPage < totalPages) {
            paginationItems.push(
               <PaginationItem key={totalPages}>
                  <PaginationLink
                     isActive={totalPages === currentPage}
                     onClick={() => handlePageChange(totalPages)}
                  >
                     {totalPages}
                  </PaginationLink>
               </PaginationItem>
            );
         }
      }

      return paginationItems;
   };

   return (
      <div>
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     onClick={() => handlePageChange(currentPage - 1)}
                     className={
                        currentPage === 1
                           ? "pointer-events-none text-gray-400"
                           : ""
                     }
                  />
               </PaginationItem>
               {renderPaginationItems()}
               <PaginationItem>
                  <PaginationNext
                     onClick={() => handlePageChange(currentPage + 1)}
                     className={
                        currentPage === totalPages
                           ? "pointer-events-none text-gray-400"
                           : ""
                     }
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </div>
   );
};

export default PaginationCustome;
