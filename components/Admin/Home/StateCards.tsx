"use client";

import { Skeleton } from "@/components/ui/skeleton";

 

;

export default function StatCards({
  statCards,
}: {
  statCards: { title: string; value: number; percentage: string }[];
}) {
  const isLoading = false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {isLoading
        ? Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white border border-gray-100 flex flex-col gap-4"
            >
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-8" />
              <Skeleton className="w-12 h-4" />
            </div>
          ))
        : statCards.map((card, idx) => (
            <div
              key={idx}
              className=" bg-[#f6f8fa] p-4 rounded-[12px]"
            >
              {/* Title */}
              <p className=" text-base text-[#64748B] ">
                {card.title}
              </p>

              {/* Large Number with Percentage */}
              <div className="flex items-end justify-between">
                <div className="  text-[32px] text-[#1E293B] font-semibold mt-7">
                  {card.value}
                </div>
                
              </div>

            </div>
          ))}
    </div>
  );
}

