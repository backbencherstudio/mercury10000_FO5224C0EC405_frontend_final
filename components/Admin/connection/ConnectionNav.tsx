"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
 

interface ConnectionNavProps {
  className?: string;
}

const ConnectionNav = ({ className = "" }: ConnectionNavProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Upload Request",
      href: "/dashboard/connection",
      
    },
    {
      label: "Connection Request Pool",
      href: "/dashboard/connection/request-pool",
      
    },
    {
      label: "Connection Status",
      href: "/dashboard/connection/status",
      
    }
  ];

const isItemActive = (href: string): boolean => {
  // Only exact match for the first item
  if (href === "/dashboard/connection") {
    return pathname === href;
  }
  // For other items, match exact or child routes
  if (pathname === href || pathname.startsWith(href + "/")) {
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

export default ConnectionNav;