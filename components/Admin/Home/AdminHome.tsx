import { Notebook } from "lucide-react";
import StatCards from "../../Dashboard/StateCards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardUserTable from "./DashboardAllLeadsTable";

function AdminHome() {
    const statCards = [
    {
      title: "Pre Application",
      value: 195,
      percentage: "0.1%",
    },
    {
      title: "Application Started",
      value: 7,
      percentage: "0.8%",
    },
    {
      title: "Applied",
      value: 18,
      percentage: "1.5%",
    },
    {
      title: "Inactive",
      value: 635,
      percentage: "72.6%",
    },
   
  ];
  return (
    <div className="flex flex-col justify-between ">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-blackColor">
            Status Statistics
          </h3>
        </div>
        <StatCards statCards={statCards} />
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
