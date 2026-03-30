'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SecretaryLeadNavProps {
  className?: string;
}

export default function SecretaryLeadNav({ className }: SecretaryLeadNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "See All User",
      href: "/secretary-dashboard/lead-history",
    },
    {
      label: "Leads In Process",
      href: "/secretary-dashboard/lead-history/process-leads",
    },
    {
      label: 'All Submitted Leads',
      href: "/secretary-dashboard/lead-history/submitted-leads"
    },
    {
      label: 'Lead History',
      href: "/secretary-dashboard/lead-history/leads"
    },
    {
      label: 'All Rewards',
      href: "/secretary-dashboard/lead-history/all-rewards"
    },
  ];

  const isItemActive = (href: string): boolean => {
    // Only active if pathname exactly matches href
    return pathname === href;
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center min-w-max md:min-w-0 md:flex-wrap md:gap-2 lg:gap-4 xl:gap-8 px-1">
        {navItems.map((item) => {
          const isActive = isItemActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center whitespace-nowrap px-3 py-2.5 text-sm sm:text-base md:text-lg font-medium transition-colors duration-200",
                "border-b-2 border-transparent",
                isActive 
                  ? "text-[#0e93a1] border-[#1d9aa7]" 
                  : "text-[#111827] hover:text-[#1d9aa7] hover:border-[#1d9aa7]/30"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  )
}