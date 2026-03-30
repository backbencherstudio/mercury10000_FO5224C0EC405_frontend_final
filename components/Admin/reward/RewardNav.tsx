"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
 

interface UserNavProps {
  className?: string;
}

const RewardNav = ({ className = "" }: UserNavProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "All Rewards",
      href: "/dashboard/reward",
      
    },
    {
      label: "Create Reward",
      href: "/dashboard/reward/create-reward",
      
    },
  ];

const isItemActive = (href: string): boolean => {
  if (!pathname) return false;
  // Exact match
  if (pathname === href) {
    return true;
  }
  // For child routes, only match if it's a direct child with additional segments
  // But we DON'T want this for "/dashboard/user" as it should only match exact
  if (href !== "/dashboard/reward" && pathname.startsWith(href + "/")) {
    return true;
  }
  return false;
};

  return (
    <nav className={cn(  className)}>
      <div className="flex items-center gap-12 ">
        {navItems.map((item) => {
          const isActive = isItemActive(item.href);
       
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2  p-2.5 text-lg font-medium transition-colors duration-200",
                "border-b border-transparent",
                isActive 
                  ? "text-[#0e93a1] border-[#1d9aa7]" 
                  : "text-[#111827] hover:text-[#1d9aa7]  "
              )}
            >
            
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default RewardNav;