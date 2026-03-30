"use client";

import { CookieHelper } from "@/helper/cookie.helper";
import { LogOutIcon } from "lucide-react";
import { getMenuItemsByRole, UserRole } from "@/config/menuItems";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ExitIcon from "../icons/ExitIcon";



interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}



const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const isActive = (href: string): boolean => {
    if (!pathname) return false;
    if (role === 'secretary') {
      // For secretary, highlight Lead History for any subpage
      if (href === '/secretary-dashboard/lead-history') {
        return pathname === '/secretary-dashboard/lead-history' || pathname.startsWith('/secretary-dashboard/lead-history/');
      }
      return pathname === href;
    }
    // For admin, keep previous logic
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    if (pathname === href) {
      return true;
    }
    return pathname?.startsWith(href + "/") || false;
  };

  const handleLogout = () => {
    CookieHelper.destroy({ key: "accessToken" });
    router.push("/log-in");
  };

  // Get role from cookies or default to 'admin'
  const [role, setRole] = React.useState<UserRole>('admin');
  const [menuItems, setMenuItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    let userRole: UserRole = 'admin';
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';').map(c => c.trim());
      const userRoleCookie = cookies.find(c => c.startsWith('userRole='));
      if (userRoleCookie) {
        const value = userRoleCookie.split('=')[1];
        if (value === 'admin' || value === 'secretary') userRole = value as UserRole;
      }
    }
    setRole(userRole);
    setMenuItems(getMenuItemsByRole(userRole));
  }, []);

  return (
    <div className="h-screen  " style={{backgroundColor:'#07454B' }}>
      <div
        className={`
          ${isOpen
            ? "z-50 h-full w-full overflow-hidden absolute top-0 left-0"
            : "h-full"
          }
          flex flex-col
          min-h-[calc(100vh-100px)] 
          w-full
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          p-3 lg:p-4 overflow-y-auto transition-all duration-300
        `}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-center   mb-12 ">
          <Link
            href={"/"}
            className={` flex items-center  transition-all duration-300 $`}
          >
            <h2 className="text-white text-[32px] font-semibold tracking-wide">
              Agua Leads
            </h2>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 mt-12">
          <div className="space-y-2 ">
            {menuItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                    hover:text-whiteColor hover:bg-navActive text-blackColor transition-all duration-200 
                    ${active ? "bg-navActive opacity-100 text-whiteColor" : ""}
                  `}
                  title={isCollapsed ? item.name : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-white">
                      {active ? <item.secondaryIcon /> : <item.icon />}
                    </div>
                    <span
                      className={`text-base font-medium text-white group-hover:text-white transition-colors duration-200 whitespace-nowrap `}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Log out section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className={`
              flex items-center hover:bg-redColor hover:text-whiteColor  cursor-pointer gap-3 px-3 py-3 
               w-full rounded-lg transition-all duration-200
             
            `}
            title={isCollapsed ? "Log Out Account" : ""}
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0">
              <   ExitIcon />
            </div>
            <span className={`text-base text-white font-normal  whitespace-nowrap `}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
