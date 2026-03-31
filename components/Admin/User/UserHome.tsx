'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TagCrossIcon from '@/components/icons/admin/TagCrossIcon';
 

interface FormData {
    user_name: string;
    phone: string;
    password: string;
    work: string;
    country: string;
    city: string;
    role: string;
    trades: string[];
}


export default function UserHome() {
    const [formData, setFormData] = useState<FormData>({
        user_name: 'Corny Bias',
        phone: '+32 1232143',
        password: 'Corny Bias',
        work: 'N/A',
        country: '',
        city: '',
        role: '',
        trades: [],
    });

  const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { id,value }=e.target
     setFormData((prev)=> ({
        ...prev,
        [id]:value
     }))
  }


    // For single-value selects (country, city, role)
    const handleSelectChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // For multi-select trades
    const handleTradeSelect = (value: string) => {
        setFormData((prev) => {
            if (prev.trades.includes(value)) return prev; // Prevent duplicates
            return {
                ...prev,
                trades: [...prev.trades, value],
            };
        });
    };

    const handleRemoveTrade = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            trades: prev.trades.filter((trade) => trade !== value),
        }));
    };

  const handleSubmit =(e:React.FormEvent)=>{
    e.preventDefault();
    console.log(formData)
  }


  return (
    <div className='flex flex-col lg:flex-row gap-6 mt-8'>

    <div className='border border-[#E9E9EA] rounded-[8px] p-4 sm:p-6 flex-[3_3_0%] w-full'>
        <h2 className=' text-2xl  text-[#111827] font-medium'>Create a User </h2>
        <form action="" className=' mt-6 space-y-6' onSubmit={handleSubmit}>
            <div className=' flex flex-col gap-1.5'>
                <label htmlFor="user_name">User Name</label>
                <input type="text" name="" id="user_name" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.user_name} onChange={handleInputChange} />
            </div>
            <div className=' flex flex-col gap-1.5'>
                <label htmlFor="phone">Phone No.</label>
                <input type="text" name="" id="phone" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className=' flex flex-col gap-1.5'>
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="password" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.password} onChange={handleInputChange} />
            </div>
            <div className=' flex flex-col gap-1.5'>
                <label htmlFor="work">Work at Company</label>
                <input type="text" name="" id="work" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.work} onChange={handleInputChange} />
            </div>
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="trade">Trade</label>
                            <Select onValueChange={handleTradeSelect}>
                                <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                                    <SelectValue placeholder="Select a trade" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="na">N/A</SelectItem>
                                        <SelectItem value="plumbing">Plumbing</SelectItem>
                                        <SelectItem value="painting">Painting</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* Show selected trades as tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.trades.map((trade) => (
                                    <span
                                        key={trade}
                                        className="flex items-center bg-[#e0f7fa] text-[#161721] text-base font-medium px-3.5 py-2.5 rounded-full border border-[#D2D2D5]  "
                                    >
                                        {trade === 'na' ? 'N/A' : trade.charAt(0).toUpperCase() + trade.slice(1)}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTrade(trade)}
                                            className="ml-2.5  cursor-pointer"
                                            aria-label={`Remove ${trade}`}
                                        >
                                           <TagCrossIcon />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
            <div className='flex flex-col sm:flex-row items-stretch gap-3 sm:gap-6'>
                <div className='flex-1'>
                    <label htmlFor="country">Country</label>
                      <Select onValueChange={(value)=>handleSelectChange('country',value)} value={formData.country}>
                          <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                              <SelectValue placeholder="Select a country" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="us">United State</SelectItem>
                                  <SelectItem value="canada">Canada</SelectItem>
                                  <SelectItem value="denmark">Denmark</SelectItem>
                                  <SelectItem value="portugal">Portugal</SelectItem>
                              </SelectGroup>
                          </SelectContent>
                      </Select>
                </div>
                <div className='flex-1 mt-3 sm:mt-0'>
                    <label htmlFor="city">City</label>
                     <Select onValueChange={(value)=>handleSelectChange('city',value)} value={formData.city}>
                          <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                              <SelectValue placeholder="Select a city" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="new york">New York</SelectItem>
                                  <SelectItem value="texas">Texas</SelectItem>
                                  <SelectItem value="verginia">Verginia</SelectItem>
                                  <SelectItem value="london">London</SelectItem>
                                  <SelectItem value="paris">Paris</SelectItem>
                              </SelectGroup>
                          </SelectContent>
                      </Select>
                </div>
            </div>
             
            <button className=' bg-[#0b7680] w-full text-white py-4  rounded-[8px] cursor-pointer'>Create User</button>
        </form>
    </div>
    <div className='flex-[1_1_0%] w-full border border-[#E9E9EA] rounded-[8px] p-4 sm:p-6 h-auto self-start mt-6 lg:mt-0'>
        <h2 className=' text-2xl  text-[#111827] font-medium'>Set Fee Rate </h2>

<form action="" className=' mt-6 space-y-6'>
         <div className=' flex flex-col gap-1.5'>
                <label htmlFor="leads_fee">Qualified Leads Fee</label>
                <input type="text" name="" id="leads_fee" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full placeholder:text-[#161721] placeholder:text-base font-medium' placeholder='100$'  />
            </div>
         <div className=' flex flex-col gap-1.5'>
                <label htmlFor="conversion_fee">Conversion Fee</label>
                <input type="text" name="" id="conversion_fee" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full placeholder:text-[#161721] placeholder:text-base font-medium' placeholder='1,500$'  />
            </div>
            <button className=' bg-[#0b7680] w-full text-white py-4  rounded-[8px] cursor-pointer'>Set Fee</button>

</form>
    </div>
    </div>
  )
}




 
