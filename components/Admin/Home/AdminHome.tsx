import { Notebook } from "lucide-react";
import StatCards from "../../Dashboard/StateCards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardUserTable from "./DashboardAllLeadsTable";
import { ChartBarDefault } from "./ChartBarDefault";

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

      <div className=" flex items-center">
      <div  className=" flex-3/4 ">
      <ChartBarDefault/>

      </div>
      <div className=" flex-3/12 bg-amber-400">
        right side content
      </div>

      </div>

      {/* Tabs for two tables with only active border bottom */}
      <div className="mt-6 border border-[#DFDFDF] p-6 rounded-[12px]">
        <Tabs defaultValue="table1" className="w-full">
          <TabsList className="flex items-center gap-12 bg-transparent p-0 mb-6">
            <TabsTrigger
              value="table1"
              className="flex items-center gap-2 p-2.5 text-lg font-medium transition-colors duration-200 border-0 border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#1d9aa7] data-[state=active]:text-[#0e93a1] text-[#111827] hover:text-[#1d9aa7] bg-transparent rounded-none"
            >
              All Submitted Leads
            </TabsTrigger>
            <TabsTrigger
              value="table2"
              className="flex items-center gap-2 p-2.5 text-lg font-medium transition-colors duration-200 border-0 border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#1d9aa7] data-[state=active]:text-[#0e93a1] text-[#111827] hover:text-[#1d9aa7] bg-transparent rounded-none"
            >
              Leads In Process
            </TabsTrigger>
          </TabsList>
          <TabsContent value="table1">
            <DashboardUserTable />
          </TabsContent>
          <TabsContent value="table2">
            {/* Replace below with your second table component */}
            <div className="p-6 bg-white text-center">Second Table Page Placeholder</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminHome;
