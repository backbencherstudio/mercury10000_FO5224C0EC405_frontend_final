import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoveLeft, MoveRight } from "lucide-react";

interface PaginationPageProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  dataLength: number;
  currentPage: number;
  setItemsPerPage?: (count: number) => void;
  totalItems?: number;
  itemsPerPage: number;
}

function PaginationPage({
  totalPages,
  onPageChange,
  dataLength,
  currentPage,
  setItemsPerPage,
  totalItems,
  itemsPerPage,
}: PaginationPageProps) {
  const getPagination = () => {
    let pages: (number | string)[] = [];
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        // Near start: 1 2 3 4 ... last
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1 ... last-3 last-2 last-1 last
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        // Middle: 1 current-1 current current+1 ... last (single ellipsis at end)
        pages = [
          1,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };
  const effectiveTotalItems =
    typeof totalItems === "number" ? totalItems : dataLength;
  const startIndex = dataLength > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, effectiveTotalItems);

  const handleItemsPerPageChange = (value: number) => {
    if (setItemsPerPage) setItemsPerPage(value);
    // Reset to page 1 on page-size change
    onPageChange(1);
  };

  const originalArray = [1, 5, 10, 25, 50, 100];
  const uniqueArray = [...new Set(originalArray)];
  return (
    <div className="  mb-0  ">
      <div className=" flex justify-end ">
        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex items-center w-full justify-between mt-6 gap-2">
            <div className="flex items-center gap-4">
              <div className="text-base text-[#7B7B7B]">
                Showing {startIndex} to {endIndex} out of {effectiveTotalItems}{" "}
                Records
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-[#4a4c56]">Show</label>
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={(value) =>
                    handleItemsPerPageChange(Number(value))
                  }
                >
                  <SelectTrigger className="w-[62px] px-1.5!">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueArray.map((opt) => (
                      <SelectItem key={opt} value={String(opt)}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="  cursor-pointer p-2 flex justify-center  items-center border border-border text-blackColor rounded-full disabled:opacity-40 disabled:text-borderColor disabled:border-borderColor"
              >
                <MoveLeft  />
              </button>
              {getPagination().map((page, i) => (
                <button
                  key={i}
                  onClick={() => typeof page === "number" && onPageChange(page)}
                  disabled={page === "..."}
                  className={`px-4 py-2.5 rounded-full cursor-pointer h-full text-sm  ${
                    page === currentPage
                      ? "text-[#06030C]   border border-border h-full  font-semibold"
                      : "text-[#A1A1A1] "
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="cursor-pointer  p-2 flex justify-center  items-center border border-border text-blackColor rounded-full disabled:opacity-40 disabled:text-borderColor disabled:border-borderColor"
              >
                {/* <MdArrowForwardIos size={15} />  */}
                 <MoveRight />
              </button>
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginationPage;
