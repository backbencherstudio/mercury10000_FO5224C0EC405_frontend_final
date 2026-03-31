'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface UserNavProps {
  className?: string;
}

export default function SettingsNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Your Profile",
      href: "/dashboard/settings",
    },
    {
      label: 'Security & Password',
      href: "/dashboard/settings/security-password"
    },
    {
      label: 'Onboarding Setting',
      href: "/dashboard/settings/onboarding-settings"
    },
  ];

  const isItemActive = (href: string): boolean => {
    if (pathname === href) {
      return true;
    }
    
    if (href !== "/dashboard/settings" && pathname?.startsWith(href + "/")) {
      return true;
    }
    
    return false;
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