"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LocationIcon from "@/public/icons/admin/LocationIcon";
import UserIcon from "@/public/icons/admin/UserIcon";
import PhoneIcon from "@/public/icons/admin/PhoneIcon";

interface ViewLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any; // You can create a proper type/interface for your user data
}

export function ViewLeadDialog({ 
  isOpen, 
  onClose, 
  userData 
}: ViewLeadDialogProps) {
  
  // Don't render anything if no user data
  if (!userData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[700px] p-12 max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className=" text-center text-[32px] text-[#070707] font-medium ">View The Lead</DialogTitle>
        </DialogHeader>
<div className=" mt-8 space-y-8">
        <div className="  space-y-5">
          <div className=" border-b border-[#e9e9ea] pb-2.5">
            <div className=" flex items-center gap-2">
            <LocationIcon/>
            <h3 className=" text-base text-[#070707] font-medium">Homeowner Address</h3>
            </div>
            <p className=" text-sm text-[#777980] mt-2.5">{ userData.city}</p>
          </div>
          <div className=" border-b border-[#e9e9ea] pb-2.5">
            <div className=" flex items-center gap-2">
            <UserIcon/>
            <h3 className=" text-base text-[#070707] font-medium">Homeowner Name</h3>
            </div>
            <p className=" text-sm text-[#777980] mt-2.5">{ userData.full_name}</p>
          </div>
          <div className=" border-b border-[#e9e9ea] pb-2.5">
            <div className=" flex items-center gap-2">
            <PhoneIcon/>
            <h3 className=" text-base text-[#070707] font-medium">HomeownerPhone</h3>
            </div>
            <p className=" text-sm text-[#777980] mt-2.5">{ userData.hmeowners_phone}</p>
          </div>
        </div>

        <div>
            <h3 className=" text-base text-[#070707] font-medium">Notes</h3>
            <p className=" text-[#777980] text-sm mt-2.5">The lead is located on 123 Main St. The owner’s name is John Smith. He has some roof leaking issue. I’ve shared some images based on specific objective.</p>
            <p className=" text-[#777980] text-sm mt-5">Please see the images below for this specific lead.</p>
        </div>


        <div>
          <h3 className=" text-base text-[#070707] font-medium">Images (3)</h3>
          <div className="flex  flex-col md:flex-row items-center gap-2.5 mt-2.5 ">
          {
            [...Array(3)].map((_,index)=>(
              <div className=" flex-1 w-full">
                    <div key={index} className="  h-[117px] border rounded-lg">
                       
                    </div>
                    <p className=" text-center text-xs text-[#4A4C56] mt-1.5">image {index+1}</p>

              </div>


            ))
          }

          </div>
        </div>

        <div className=" flex flex-col md:flex-row items-center  gap-8">
          <button className="text-base text-white py-3 bg-[#0b7680] rounded-[8px] w-full cursor-pointer">Accept</button>
          <button className="text-base text-white py-3 bg-[#e60000] rounded-[8px] w-full cursor-pointer">Decline</button>
          
        </div>
</div>



         
        
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">ID:</span>
            <span className="col-span-3">{userData.id}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">Name:</span>
            <span className="col-span-3">{userData.full_name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">City:</span>
            <span className="col-span-3">{userData.city}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">Homeowner:</span>
            <span className="col-span-3">{userData.hmeowners_name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">Phone:</span>
            <span className="col-span-3">{userData.hmeowners_phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">Trade:</span>
            <span className="col-span-3">{userData.trade}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-bold">Lead Sent:</span>
            <span className="col-span-3">{userData.lead_sent}</span>
          </div>
        </div> */}

       
      </DialogContent>
    </Dialog>
  );
}