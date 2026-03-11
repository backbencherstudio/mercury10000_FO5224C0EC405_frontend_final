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
 

interface FormData {
  user_name: string;
  phone: string;
  password: string;
  work: string;
  country: string;
  city: string;
  role: string;
  trade: string;
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
    trade: ''
  });

  const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { id,value }=e.target
     setFormData((prev)=> ({
        ...prev,
        [id]:value
     }))
  }

  const handleSelectChange =(field: keyof FormData , value:string)=>{
         setFormData((prev)=>({
            ...prev,
            [field]:value
         }))
  }

  const handleSubmit =(e:React.FormEvent)=>{
    e.preventDefault();
    console.log(formData)
  }


  return (
    <div className=' mt-8 border border-[#D2D2D5] rounded-[8px] p-6'>
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
            <div className=' flex items-center gap-6'>
                <div className='flex-1 '>
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
                <div className=' flex-1'>
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
            <div className=' flex items-center gap-6'>
                <div className=' flex-1'>
                    <label htmlFor="role">Role</label>
                     <Select onValueChange={(value)=>handleSelectChange('role',value)} value={formData.role}>
                          <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                              <SelectValue placeholder="Select a role" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                          </SelectTrigger>
                          <SelectContent >
                              <SelectGroup >
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="support">Support</SelectItem>
                                  <SelectItem value="user">User</SelectItem>
                                   
                              </SelectGroup>
                          </SelectContent>
                      </Select>
                </div>
                <div className=' flex-1'>
                    <label htmlFor="trade">Trade</label>
                     <Select onValueChange={(value)=>handleSelectChange('trade',value)} value={formData.trade}>
                          <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                              <SelectValue placeholder="Select a trade" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                          </SelectTrigger>
                          <SelectContent >
                              <SelectGroup >
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="na">N/A</SelectItem>
                                  <SelectItem value="plumbing">Plumbing</SelectItem>
                                  <SelectItem value="painting">Painting</SelectItem>
                                   
                              </SelectGroup>
                          </SelectContent>
                      </Select>
                </div>
            </div>
            <button className=' bg-[#0b7680] w-full text-white py-4  rounded-[8px] cursor-pointer'>Create User</button>
        </form>
    </div>
  )
}




 
