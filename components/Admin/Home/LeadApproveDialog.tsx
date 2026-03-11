"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import confirmImg from '@/public/images/admin/confirm-img.png' 
import bigStar from '@/public/images/admin/big-star.png'
import smallStar from '@/public/images/admin/little-star.png'

interface LeadApproveProps {
  isOpen: boolean;
  onClose: () => void;
  
}

export function LeadApproveDialog({ 
  isOpen, 
  onClose, 
}: LeadApproveProps) {
  
 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[734px] p-16 border-none">
        <div className=" flex justify-center items-center">
          <div className=" relative">
          <Image src={confirmImg} alt="confirm img"/>
         
            <Image src={bigStar} alt="big star" className=" absolute top-10 left-0"/>
            <Image src={bigStar} alt="big star" className=" absolute top-28 right-0"/>
         
          
            <Image src={smallStar} alt="little star" className="  absolute top-28 left-5"/>
            <Image src={smallStar} alt="little star" className="  absolute top-8 right-5"/>
          

          </div>
        </div>
        <DialogHeader>
          <DialogTitle className=" text-center text-[#161721] text-2xl font-medium py-8">Lead Accepted And Now Available on The Lead Pool</DialogTitle>
        </DialogHeader>
         <div className=" flex items-center justify-center">

        <button className=" bg-[#0b7680] py-3 w-[214px] rounded-[8px] text-base text-white ">View All Leads</button>
          
         </div>
       
      </DialogContent>
    </Dialog>
        
      

  );
}