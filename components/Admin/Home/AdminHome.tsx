import { Notebook } from "lucide-react";
 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardUserTable from "./DashboardAllLeadsTable";
import { ChartBarDefault } from "./ChartBarDefault";
import StatCards from "./StateCards";
import UpcomingGift from "./UpcomingGift";
import Leads from "../Leads";

function AdminHome() {
  const statCards = [
  {
    title: "Total Users",
    value: 96,
    percentage: "100%",
  },
  {
    title: "New Lead Received",
    value: 2,
    percentage: "2%",
  },
  {
    title: "User Requests",
    value: 18,
    percentage: "18%",
  },
  {
    title: "Gifts Overview",
    value: 12,
    percentage: "12%",
  },
  {
    title: "Connection Request",
    value: 12,
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
        <div className="lg:flex-[1_1_0%] w-full">
          <UpcomingGift />
        </div>
      </div>

      <div className="mt-6">
        <Leads />
      </div>
    </div>
  )
}

export default AdminHome;
