// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@headlessui/react";
// import { Dot3Icon } from "react-icons/all";

// export default function DashboardUserColumn({
//   onLeadProcess,
//   onNotLead,
// }) {
//   const ActionDropdown = ({ row }: { row: any }) => (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="h-8 w-8 p-0 flex items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none">
//           <Dot3Icon className="h-5 w-5" />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem
//           onClick={() => onLeadProcess && onLeadProcess(row)}
//         >
//           Lead in Process
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => onNotLead && onNotLead(row)}
//         >
//           Not a Lead
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );

//   return (
//     <div>
//       <h2>Dashboard User Column</h2>
//       <ActionDropdown />
//     </div>
//   );
// }