"use client"
import { Notebook } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardUserTable from "./DashboardAllLeadsTable";
import { ChartBarDefault } from "./ChartBarDefault";
import StatCards from "./StateCards";
import UpcomingGift from "./UpcomingGift";
import Leads from "../Leads";
import { useGetDashboardstatusCardQuery } from "@/redux/features/dashboardOverview/dashboardOverView";

function AdminHome() {

  const { data: statusCardData } = useGetDashboardstatusCardQuery({});



  const statCards = [
    {
      title: "Total Users",
      value: statusCardData?.total_users,
      percentage: "100%",
    },
    {
      title: "New Lead Received",
      value: statusCardData?.new_lead_received,
      percentage: "2%",
    },
    {
      title: "User Requests",
      value: statusCardData?.user_requests,
      percentage: "18%",
    },
    {
      title: "Gifts Overview",
      value: statusCardData?.gifts_overview,
      percentage: "12%",
    },
    {
      title: "Connection Request",
      value: statusCardData?.connection_request,
      percentage: "12%",
    },
  ];
  return (
    <div className="p-2 sm:p-4">
      <div>
        <StatCards statCards={statCards} />
      </div>

      <div className="flex flex-col lg:flex-row items-stretch mt-5 gap-6">
        <div className="lg:flex-[3_3_0%] w-full">
          <ChartBarDefault />
        </div>
        {/* <div className="lg:flex-[1_1_0%] w-full">
            <UpcomingGift />
          </div> */}
      </div>

      <div className="mt-6">
        <Leads />
      </div>
    </div>
  )
}

export default AdminHome;
