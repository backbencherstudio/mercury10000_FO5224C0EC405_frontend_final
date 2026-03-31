import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import DashboardAllLeadsTable from './Home/DashboardAllLeadsTable'
import ProcessLeads from './lead/ProcessLeads'

export default function Leads() {
  return (
    <div>
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
            <DashboardAllLeadsTable />
          </TabsContent>
          <TabsContent value="table2">
            {/* Replace below with your second table component */}
             <ProcessLeads/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
