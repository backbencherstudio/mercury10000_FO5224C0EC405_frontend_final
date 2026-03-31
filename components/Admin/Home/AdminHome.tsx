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
    <div className="  ">
      <div>
        
        <StatCards statCards={statCards} />
      </div>

      <div className=" flex items-center mt-5 gap-6">
      <div  className=" flex-3/4 ">
      <ChartBarDefault/>

      </div>
      <div className=" flex-3/12  ">
        <UpcomingGift/>
      </div>

      </div>

   <Leads/>
    </div>
  )
}

export default AdminHome;
