"use client";

import { CloudCog, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdNotifications } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Search from "./Search";
import { CookieHelper } from "@/helper/cookie.helper";
import { useGetSocketNotificationQuery } from "@/redux/features/notification/notification";
import { useGetAuthmeQuery } from "@/redux/features/auth/authApi";

interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  sidebarOpen,
}: HeaderProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: notificationsData } = useGetSocketNotificationQuery({});
  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.length; // You can add logic for 'unread' if the API supports it

  // Dynamic title logic using routeToTitle mapping (user's preferred system)
  const routeToTitle: { [key: string]: string } = {
    "/dashboard": "Home",
    "/dashboard/user": "User Management",
    '/dashboard/lead': "Lead ",
    "/dashboard/lead-history": "Lead History",
    "/dashboard/connection": "Connection",
    "/dashboard/reward": "Rewards Management",
    "/dashboard/support": "Support",
    "/dashboard/settings": "Setting and Notification",
    "/secretary-dashboard": "Home",
    "/secretary-dashboard/lead-history": 'All Management'
  };
  // Dynamically change the title based on the base route
  const safePathname = pathname ?? "";
  const headerTitle: string = routeToTitle[safePathname] || "Dashboard"; // Default to "Dashboard"

  // Eta correct
  const { data: authData, isLoading: isAuthLoading, error: authError } = useGetAuthmeQuery({})

  // Extract user data safely
  const user = authData?.data

  // Handle loading and error states
  useEffect(() => {
    if (authError) {
      console.error("Failed to fetch auth data:", authError)
    }
  }, [authError])

  return (
    <nav className=" text-blackColor border-b  border-borderColor  py-6">
      <div className=" px-3  md:px-6   relative flex justify-between w-full mb-1 z-50">
        {/* Mobile menu button */}
        <div>
          <div className=" xl:hidden h-full flex items-center">
            <button
              onClick={onMenuClick}
              className=" pr-2 py-2  text-[#4A4C56]"
            >
              {sidebarOpen ? (
                <X className=" z-50 bg-black " />
              ) : (
                <Menu className="text-blackColor" />
              )}
            </button>
          </div>
        </div>

        {/* Notification and Profile Group */}
        <div className="flex items-center gap-2 lg:gap-6 justify-end w-full">
          <div className="flex-1">
            <h2 className="text-[32px] font-medium text-[#070707] truncate">{headerTitle}</h2>
          </div>
          <div className="flex items-center gap-2 lg:gap-5 justify-between">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger
                className="cursor-pointer relative flex justify-center items-center "
                onClick={() => setPopoverOpen(!popoverOpen)}
              >
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex justify-center items-center text-xs w-4 h-4 text-whiteColor rounded-full bg-redColor">
                    {unreadCount}
                  </span>
                )}

                <MdNotifications className="text-gray-700" size={24} />
              </PopoverTrigger>

              <PopoverContent className="w-80 md:w-[350px] mt-4 p-0 max-h-[500px] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                  <h4 className="text-base font-bold md:text-lg text-headerColor">
                    Notifications
                  </h4>

                  <button
                    onClick={() => setPopoverOpen(false)}
                    className="text-[#455468] bg-bgColor w-[35px] h-[35px] shadow-sm rounded-full cursor-pointer text-lg font-bold flex items-center justify-center"
                  >
                    <X className="" size={18} />
                  </button>
                </div>

                <div className="overflow-y-auto px-2 py-1 flex-1">
                  {notifications.length > 0 ? (
                    <div className="flex flex-col">
                      {notifications.map((notification: any) => (
                        <div key={notification.id} className="p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
                          <div className="flex gap-3">
                            {notification.sender?.avatar ? (
                              <Image src={notification.sender.avatar} alt="avatar" width={32} height={32} className="rounded-full w-8 h-8 shrink-0" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-[#0b7680]/10 flex items-center justify-center text-[#0b7680] text-xs font-bold shrink-0">
                                {notification.sender?.name?.charAt(0) || "U"}
                              </div>
                            )}
                            <div className="flex flex-col gap-0.5 overflow-hidden">
                              <p className="text-sm font-semibold text-[#1D1F2C] truncate">
                                {notification.sender?.name || "New Notification"}
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {/* {notification.notification_event?.message || "You have a new update."} */}
                                {notification.notification_event?.text || "You have a new update."}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {new Date(notification.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500 py-10">
                      No notifications available
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <div className="  relative sm:ml-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-3 h-full items-center">
                    <div
                      className="flex items-center  p-1  rounded-full cursor-pointer hover:opacity-90"
                      style={{
                        boxShadow: "2px 2px 7px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className=" w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
                        <Image
                          src={"/profile.png"}
                          alt="Admin Avatar"
                          width={40}
                          height={40}
                          className="rounded-md w-full h-full"
                        />
                      </div>
                    </div>

                    <button className=" cursor-pointer">
                      <IoIosArrowDown size={16} className="text-blackColor" />
                    </button>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-headerColor">
                      {user?.type}
                    </p>
                    <p className="text-xs text-textColor">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => {
                      CookieHelper.destroy({ key: "user" });
                      CookieHelper.destroy({ key: "userRole" });
                      CookieHelper.destroy({ key: "userType" });
                      CookieHelper.destroy({ key: "accessToken" });
                      CookieHelper.destroy({ key: "refreshToken" });
                      router.push("/log-in");
                    }}
                    className="text-redColor hover:bg-redColor/10! flex justify-center w-full hover:text-redColor! hover:border hover:border-redColor font-semibold cursor-pointer"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      {/* Removed mobile search field */}
    </nav>
  );
};

export default Header;
