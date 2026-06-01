"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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
import { CookieHelper } from "@/helper/cookie.helper";
import { useGetSocketNotificationQuery } from "@/redux/features/notification/notification";
import { useGetAuthmeQuery } from "@/redux/features/auth/authApi";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

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
  const socketRef = useRef<Socket | null>(null);
  const [liveNotifications, setLiveNotifications] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
  const { data: authData, error: authError } = useGetAuthmeQuery({});
  const user = authData?.data || [];
  const { data: notificationsData } = useGetSocketNotificationQuery({});

  const routeToTitle: { [key: string]: string } = {
    "/dashboard": "Home",
    "/dashboard/user": "User Management",
    "/dashboard/lead": "Lead",
    "/dashboard/lead-history": "Lead History",
    "/dashboard/connection": "Connection",
    "/dashboard/reward": "Rewards Management",
    "/dashboard/support": "Support",
    "/dashboard/settings": "Setting and Notification",
    "/secretary-dashboard": "Home",
    "/secretary-dashboard/lead-history": "All Management",
  };

  const safePathname = pathname ?? "";
  const headerTitle = routeToTitle[safePathname] || "Dashboard";

  // Get userId from authData instead of decoding token
  const userId = user?.id || null;

  // console.log("userId", userId);


  useEffect(() => {
    if (authError) {
      // console.error("Failed to fetch auth data:", authError);
    }
  }, [authError]);

  // useEffect(() => {
  //   if (notificationsData?.data) {
  //     setLiveNotifications(notificationsData.data);
  //   }
  // }, [notificationsData]);

  useEffect(() => {
    if (notificationsData?.data) {
      setLiveNotifications((prev) => {
        const merged = [...notificationsData.data, ...prev];

        // remove duplicates
        const unique = Array.from(
          new Map(merged.map(item => [item.id, item])).values()
        );

        return unique;
      });
    }
  }, [notificationsData]);

  // Header.tsx - Next.js
  useEffect(() => {
    if (!SOCKET_URL || !userId) {
      // console.warn("Waiting for userId to connect socket...");
      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: { userId },
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log(" Socket connected with ID:", socket.id);
      setIsConnected(true);
      setConnectionError(null);
    });

    // socket.on("notification", (newData) => {
    //   // console.log(" New Real-time Notification:", newData);

    //   setLiveNotifications((prev) => [newData, ...prev]);


    // });

    socket.on("notification", (newData) => {
      setLiveNotifications((prev) => [newData, ...prev]);
    });


    socket.on("connect_error", (err) => {
      // console.error(" Connection Error:", err.message);
      setIsConnected(false);
      setConnectionError(err.message);
    });

    socket.on("disconnect", (reason) => {
      // console.log("🔌 Disconnected:", reason);
      setIsConnected(false);
    });


    return () => {
      if (socketRef.current) {
        socketRef.current.off("notification");
        // socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [SOCKET_URL, userId]);

  const unreadCount = liveNotifications.filter((item) => !item?.is_read).length;

  return (
    <nav className="text-blackColor border-b border-borderColor py-6">
      <div className="px-3 md:px-6 relative flex justify-between w-full mb-1 z-50">
        {/* MOBILE MENU */}
        <div>
          <div className="xl:hidden h-full flex items-center">
            <button onClick={onMenuClick} className="pr-2 py-2 text-[#4A4C56]">
              {sidebarOpen ? (
                <X className="z-50 bg-black" />
              ) : (
                <Menu className="text-blackColor" />
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 lg:gap-6 justify-end w-full">
          {/* TITLE */}
          <div className="flex-1">
            <h2 className="text-[32px] font-medium text-[#070707] truncate">
              {headerTitle}
            </h2>
          </div>

          {/* Connection Status Indicator */}
          {/* <div className="hidden md:flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs text-gray-500">
              {isConnected ? 'Live' : "" || ''}
            </span>
          </div> */}

          <div className="flex items-center gap-2 lg:gap-5 justify-between">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger className="cursor-pointer relative flex justify-center items-center">
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex justify-center items-center text-xs w-5 h-5 text-whiteColor rounded-full bg-redColor">
                    {unreadCount}
                  </span>
                )}
                <MdNotifications className="text-gray-700" size={24} />
              </PopoverTrigger>

              <PopoverContent className="w-80 md:w-[350px] mt-4 p-0 max-h-[500px] flex flex-col">
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                  <h4 className="text-base font-bold md:text-lg text-headerColor">
                    Notifications
                  </h4>
                  <button
                    onClick={() => setPopoverOpen(false)}
                    className="text-[#455468] bg-bgColor w-[35px] h-[35px] shadow-sm rounded-full cursor-pointer text-lg font-bold flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* BODY */}
                <div className="overflow-y-auto px-2 py-1 flex-1">
                  {liveNotifications.length > 0 ? (
                    <div className="flex flex-col">
                      {liveNotifications.map(
                        (notification: any, index: number) => (
                          <div
                            key={notification?.id || index}
                            className="p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg"
                          >
                            <div className="flex gap-3">
                              {/* AVATAR */}
                              {notification?.sender?.avatar ? (
                                <Image
                                  src={notification.sender.avatar}
                                  alt="avatar"
                                  width={32}
                                  height={32}
                                  className="rounded-full w-8 h-8 shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#0b7680]/10 flex items-center justify-center text-[#0b7680] text-xs font-bold shrink-0">
                                  {notification?.sender?.name?.charAt(0) || "U"}
                                </div>
                              )}

                              {/* CONTENT */}
                              <div className="flex flex-col gap-0.5 overflow-hidden">
                                <p className="text-sm font-semibold text-[#1D1F2C] truncate">
                                  {notification?.sender?.name ||
                                    "New Notification"}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {notification?.text ||
                                    notification?.notification_event?.text ||
                                    "You have a new update."}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1">
                                  {notification?.created_at
                                    ? new Date(
                                      notification.created_at,
                                    ).toLocaleDateString()
                                    : new Date().toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500 py-10">
                      No notifications available
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <div className="relative sm:ml-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-3 h-full items-center">
                    <div
                      className="flex items-center p-1 rounded-full cursor-pointer hover:opacity-90"
                      style={{
                        boxShadow: "2px 2px 7px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
                        <Image
                          src={"/profile.png"}
                          alt="Admin Avatar"
                          width={40}
                          height={40}
                          className="rounded-md w-full h-full"
                        />
                      </div>
                    </div>
                    <button className="cursor-pointer">
                      <IoIosArrowDown size={16} className="text-blackColor" />
                    </button>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-headerColor">
                      {user?.type}
                    </p>
                    <p className="text-xs text-textColor">{user?.email}</p>

                  </div>
                  <DropdownMenuSeparator />

                  {/* LOGOUT */}
                  <DropdownMenuItem
                    onClick={() => {
                      if (socketRef.current) {
                        socketRef.current.disconnect();
                        socketRef.current = null;
                      }

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
    </nav>
  );
};

export default Header;