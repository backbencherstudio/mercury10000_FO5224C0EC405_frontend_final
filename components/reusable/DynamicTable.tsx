"use client";

import Image from "next/image";
import React from "react";
import Loader from "./Loader";
import PaginationPage from "./PaginationPage";

interface DynamicTableProps {
  columns: any;
  data: any[];
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onView?: (row: any) => void;
  onDelete?: (id: any) => void;
  noDataMessage?: string;
  totalpage?: number;
  totalItems?: number;
  setItemsPerPage?: (n: number) => void;
  loading?: boolean;
  error?: string;
  border?: boolean;
  renderFooter?: (colSpan: number) => React.ReactNode;
  showPagination?: boolean
}

export default function DynamicTable({
  columns,
  data,
  currentPage,
  itemsPerPage,
  border = true,
  onPageChange,
  loading,
  onView,
  totalpage,
  onDelete,
  noDataMessage = "No data found !.",
  totalItems,
  setItemsPerPage,
  error,
  renderFooter,
  showPagination = true
}: DynamicTableProps) {
  const totalCols = columns.length + (onView || onDelete ? 1 : 0);
  const isLastCol = (index: number) =>
    index === columns.length - 1 && !onView && !onDelete;

  return (
    <div className="w-full">
      
      <div className="overflow-hidden rounded-t-lg"> {/* Changed from rounded-lg to rounded-t-lg */}
        <div className="overflow-x-auto bg-white">
          <table className="w-full min-w-[1000px] text-left border-separate border-spacing-0">

            <thead className="bg-[#f7f7f7] sticky top-0 z-10">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    scope="col"
                    style={{ width: col.width || "auto" }}
                    className={`
                      px-4 py-4 text-sm font-medium text-[#7B7B7B] border-gray-200
                      border-t border-b border-r
                      ${index === 0 ? "border-l rounded-tl-lg" : ""}
                      ${isLastCol(index) ? "rounded-tr-lg" : ""}
                    `}
                  >
                    {col.label}
                  </th>
                ))}
                {(onView || onDelete) && (
                  <th
                    scope="col"
                    className="px-4 py-4 text-sm font-medium text-[#7B7B7B] border-t border-b border-r border-gray-200 rounded-tr-lg"
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={totalCols}
                    className="px-4 py-12 text-center border-l border-r border-b border-gray-200"
                  >
                    <Loader />
                  </td>
                </tr>
              ) : data?.length > 0 ? (
                data.map((row, rowIndex) => {
                  const isLastRow = rowIndex === data.length - 1;
                  return (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          style={{ width: col.width || "auto" }}
                          className={`
                            px-4 py-3 text-sm text-[#4a4c56] border-gray-200
                            border-r border-b
                            ${colIndex === 0 ? "border-l" : ""}
                          `}
                        >
                          {col.formatter
                            ? col.formatter(
                                row[col.accessor],
                                row,
                                (currentPage - 1) * itemsPerPage + rowIndex
                              )
                            : row[col.accessor]}
                        </td>
                      ))}

                      {(onView || onDelete) && (
                        <td
                          className={`
                            px-4 py-3 border-gray-200 border-r border-b
                          `}
                        >
                          <div className="flex items-center gap-4">
                            {onView && (
                              <button
                                onClick={() => onView(row)}
                                className="text-xs underline text-[#4a4c56] hover:text-blue-600 transition-colors"
                              >
                                View details
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => onDelete(row.id)}
                                className="hover:opacity-70 transition-opacity"
                              >
                                <Image
                                  src="/dashboard/icon/delete.svg"
                                  alt="delete"
                                  width={16}
                                  height={16}
                                  className="cursor-pointer"
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={totalCols}
                    className="px-4 py-12 text-center border-l border-r border-b border-gray-200"
                  >
                    {error ? (
                      <p className="text-red-500 text-lg capitalize font-semibold">
                        {error} - please login again
                      </p>
                    ) : (
                      <p className="text-lg text-gray-500 capitalize font-semibold">
                        {noDataMessage}
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>

            {renderFooter && (
              <tfoot className="bg-gray-50">
                <tr>
                  <td
                    colSpan={totalCols}
                    className="border-l border-r border-b border-gray-200"
                  >
                    {renderFooter(totalCols)}
                  </td>
                </tr>
              </tfoot>
            )}

          </table>
        </div>
      </div>

      <div>
        {showPagination && (
          <PaginationPage
            totalPages={totalpage}
            dataLength={data?.length || 0}
            totalItems={totalItems}
            onPageChange={onPageChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </div>
    </div>
  );
}