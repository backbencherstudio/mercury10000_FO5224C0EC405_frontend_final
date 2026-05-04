'use client'
import React, { useEffect, useState } from 'react'
import { Country, City } from 'country-state-city'
import { toast } from 'react-hot-toast'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TagCrossIcon from '@/components/icons/admin/TagCrossIcon';
import { UserService } from '@/service/user/user.service';
import { useRegisterMutation } from '@/redux/features/auth/authApi'


interface FormData {
    user_name: string;
    phone: string;
    email: string;
    password: string;
    work: string;
    country: string;
    city: string;
    trades: string[];
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

interface FeeFormData {
    qualified_leads_fee: number | '';
    conversion_fee: number | '';
}

type FeeFieldErrors = Partial<Record<keyof FeeFormData, string>>;
type AppliedFeeData = {
    qualified_leads_fee?: number;
    conversion_fee?: number;
};

const emptyFormData: FormData = {
    user_name: '',
    phone: '',
    email: '',
    password: '',
    work: '',
    country: '',
    city: '',
    trades: [],
};
type Trade = {
  id: string;
  name: string;
};
const emptyFeeFormData: FeeFormData = {
    qualified_leads_fee: '',
    conversion_fee: '',
};


export default function UserHome() {
    const [formData, setFormData] = useState<FormData>(emptyFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [feeFormData, setFeeFormData] = useState<FeeFormData>(emptyFeeFormData);
    const [feeFieldErrors, setFeeFieldErrors] = useState<FeeFieldErrors>({});
    const [appliedFeeData, setAppliedFeeData] = useState<AppliedFeeData>({});
    const [tradeIdMap, setTradeIdMap] = useState<Record<string, string>>({});

    const [registerUser, { isLoading }] = useRegisterMutation();
    const setUserField = (field: keyof FormData, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (fieldErrors[field]) {
            setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const setFeeField = (field: keyof FeeFormData, value: number | '') => {
        setFeeFormData((prev) => ({ ...prev, [field]: value }));
        if (feeFieldErrors[field]) {
            setFeeFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserField(id as keyof FormData, value);
    };

    const handleFeeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFeeField(id as keyof FeeFormData, value === '' ? '' : Number(value));
    };

    const handleSetFeeSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nextFeeErrors: FeeFieldErrors = {};
        const hasQualifiedFee = feeFormData.qualified_leads_fee !== '';
        const hasConversionFee = feeFormData.conversion_fee !== '';

        if (!hasQualifiedFee && !hasConversionFee) {
            setAppliedFeeData({});
            setFeeFieldErrors({});
            toast.success('Fee cleared');
            return;
        }

        if (!hasQualifiedFee) {
            nextFeeErrors.qualified_leads_fee = 'Qualified leads fee is required';
        }

        if (!hasConversionFee) {
            nextFeeErrors.conversion_fee = 'Conversion fee is required';
        }

        if (Object.keys(nextFeeErrors).length > 0) {
            setFeeFieldErrors(nextFeeErrors);
            return;
        }

        setFeeFieldErrors({});
        setAppliedFeeData({
            qualified_leads_fee: Number(feeFormData.qualified_leads_fee),
            conversion_fee: Number(feeFormData.conversion_fee),
        });
        toast.success('Fee set successfully');
    };


    // For single-value selects (country, city, role)
    const handleSelectChange = (field: keyof FormData, value: string) => {
        setUserField(field, value);
    };

    const handleCountryChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            country: value,
            city: '',
        }));

        setFieldErrors((prev) => ({
            ...prev,
            country: undefined,
            city: undefined,
        }));
    };

    const countryOptions = Country.getAllCountries();
    const cityOptions = formData.country ? City.getCitiesOfCountry(formData.country) ?? [] : [];

    useEffect(() => {
        const loadTradeIds = async () => {
            const map = await UserService.getTradeIdMap();
            setTradeIdMap(map);
        };

        loadTradeIds();
    }, []);

    // For multi-select trades
 const handleTradeSelect = (value: string) => {
    setFormData((prev) => {
        if (value === "na") {
            return {
                ...prev,
                trades: ["na"], 
            };
        }

        const exists = prev.trades.includes(value);
        if (exists) return prev;

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

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const selectedCountry = countryOptions.find(
    (country) => country.isoCode === formData.country
  );

  const selectedTradesPayload = formData.trades
    .filter((trade) => trade !== "na")
    .map((trade) => tradeIdMap[trade] || trade);

  const payload = {
    username: formData.user_name.trim(),
    phone_number: formData.phone.trim(),
    email: formData.email.trim(),
    password: formData.password,
    work_at_company: formData.work.trim(),
    city: formData.city,
    country: selectedCountry?.name || formData.country,
    qualified_leads_fee: feeFormData?.qualified_leads_fee || 0,
    conversion_fee: feeFormData?.conversion_fee || 0,
    type: "USER",
    trades: selectedTradesPayload,
    ...appliedFeeData,
  };

  const nextFieldErrors: FieldErrors = {};

  if (!payload.username) nextFieldErrors.user_name = "User name is required";
  if (!payload.phone_number) nextFieldErrors.phone = "Phone number is required";
  if (!payload.email) nextFieldErrors.email = "Email is required";
  if (!payload.password) nextFieldErrors.password = "Password is required";
  if (!payload.work_at_company) nextFieldErrors.work = "Work is required";
  if (!payload.country) nextFieldErrors.country = "Country is required";
  if (!payload.city) nextFieldErrors.city = "City is required";
  if (payload.trades.length === 0) nextFieldErrors.trades = "At least one trade is required";

  const nextFeeErrors: FeeFieldErrors = {};
  if (!feeFormData.qualified_leads_fee) nextFeeErrors.qualified_leads_fee = "Qualified leads fee is required";
  if (!feeFormData.conversion_fee) nextFeeErrors.conversion_fee = "Conversion fee is required";

  if (Object.keys(nextFieldErrors).length > 0 || Object.keys(nextFeeErrors).length > 0) {
    setFieldErrors(nextFieldErrors);
    setFeeFieldErrors(nextFeeErrors);
    return;
  }

  setFieldErrors({});
  setFeeFieldErrors({});

  try {
    const res = await registerUser(payload).unwrap();

    toast.success(res?.message || "User created successfully");

    setFormData(emptyFormData);
    setFeeFormData(emptyFeeFormData);
    setAppliedFeeData({});
    setFeeFieldErrors({});
  } catch (error: any) {
    const message =
      error?.data?.message ||
      error?.message ||
      "Failed to create user";

    toast.error(message);
  }
};


    return (
        <div className='flex flex-col lg:flex-row gap-6 mt-8'>

            <div className='border border-[#E9E9EA] rounded-[8px] p-4 sm:p-6 flex-[3_3_0%] w-full'>
                <h2 className=' text-2xl  text-[#111827] font-medium'>Create a User </h2>
                <form action="" className=' mt-6 space-y-6' onSubmit={handleSubmit}>
                   <div className="flex gap-4">
                    <div className='w-2/3'>
 <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="user_name">User Name</label>
                        <input type="text" name="" id="user_name" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.user_name} onChange={handleInputChange} />
                        {fieldErrors.user_name && <span className='text-red-600 text-sm'>{fieldErrors.user_name}</span>}
                    </div>
                    <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="phone">Phone No.</label>
                        <input type="text" name="" id="phone" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.phone} onChange={handleInputChange} />
                        {fieldErrors.phone && <span className='text-red-600 text-sm'>{fieldErrors.phone}</span>}
                    </div>
                    <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="" id="email" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.email} onChange={handleInputChange} />
                        {fieldErrors.email && <span className='text-red-600 text-sm'>{fieldErrors.email}</span>}
                    </div>
                    <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="password" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.password} onChange={handleInputChange} />
                        {fieldErrors.password && <span className='text-red-600 text-sm'>{fieldErrors.password}</span>}
                    </div>
                    <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="work">Work at Company</label>
                        <input type="text" name="" id="work" className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full' value={formData.work} onChange={handleInputChange} />
                        {fieldErrors.work && <span className='text-red-600 text-sm'>{fieldErrors.work}</span>}
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
    {formData.trades.length === 0 && (
        <span className="text-gray-400 text-sm">No trade selected</span>
    )}

    {formData.trades.map((trade) => (
        <span
            key={trade}
            className="flex items-center bg-[#e0f7fa] px-3 py-2 rounded-full border"
        >
            {trade === "na"
                ? "N/A"
                : trade.charAt(0).toUpperCase() + trade.slice(1)}

            <button
                type="button"
                onClick={() => handleRemoveTrade(trade)}
                className="ml-2"
            >
                <TagCrossIcon />
            </button>
        </span>
    ))}
</div>
                        {fieldErrors.trades && <span className='text-red-600 text-sm'>{fieldErrors.trades}</span>}
                    </div>
                    <div className='flex flex-col sm:flex-row items-stretch gap-3 sm:gap-6'>
                        <div className='flex-1'>
                            <label htmlFor="country">Country</label>
                            <Select onValueChange={handleCountryChange} value={formData.country}>
                                <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                                    <SelectValue placeholder="Select a country" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {countryOptions.map((country) => (
                                            <SelectItem key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {fieldErrors.country && <span className='text-red-600 text-sm mt-1 block'>{fieldErrors.country}</span>}
                        </div>
                        <div className='flex-1 mt-3 sm:mt-0'>
                            <label htmlFor="city">City</label>
                            <Select onValueChange={(value) => handleSelectChange('city', value)} value={formData.city}>
                                <SelectTrigger className="w-full  py-5 mt-1.5 border-[#D2D2D5] cursor-pointer">
                                    <SelectValue placeholder="Select a city" className=' text-base text-[#161721] font-medium placeholder:text-base placeholder:text-[#161721]' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {cityOptions.map((city) => (
                                            <SelectItem key={`${city.name}-${city.latitude}-${city.longitude}`} value={city.name}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {fieldErrors.city && <span className='text-red-600 text-sm mt-1 block'>{fieldErrors.city}</span>}
                        </div>
                    </div>
                    </div>

                    <div className='w-1/3 mt-7'>
 <div className='flex-[1_1_0%] w-full border border-[#E9E9EA] rounded-[8px] p-4 sm:p-6 h-auto self-start mt-6 lg:mt-0'>
                <h2 className=' text-2xl  text-[#111827] font-medium'>Set Fee Rate </h2>

                <form action="" className=' mt-6 space-y-6' onSubmit={handleSetFeeSubmit}>
                    <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="leads_fee">Qualified Leads Fee</label>
                        <input
                            type="number"
                            name=""
                            id="qualified_leads_fee"
                            className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full placeholder:text-[#161721] placeholder:text-base font-medium'
                            placeholder='100'
                            value={feeFormData.qualified_leads_fee}
                            onChange={handleFeeInputChange}
                        />
                    </div>
                    {feeFieldErrors.qualified_leads_fee && <span className='text-red-600 text-sm'>{feeFieldErrors.qualified_leads_fee}</span>}
                    <div className=' flex flex-col gap-1.5'>
                        <label htmlFor="conversion_fee">Conversion Fee</label>
                        <input
                            type="number"
                            name=""
                            id="conversion_fee"
                            className=' py-2  px-2.5 rounded-[8px] border border-[#D2D2D5] w-full placeholder:text-[#161721] placeholder:text-base font-medium'
                            placeholder='10'
                            value={feeFormData.conversion_fee}
                            onChange={handleFeeInputChange}
                        />
                    </div>
                    {feeFieldErrors.conversion_fee && <span className='text-red-600 text-sm'>{feeFieldErrors.conversion_fee}</span>}
                    {/* <button type='submit' className=' bg-[#0b7680] w-full text-white py-4  rounded-[8px] cursor-pointer'>Set Fee</button> */}

                </form>
            </div>
                    </div>
                   </div>

                    <button disabled={isSubmitting} className=' bg-[#0b7680] w-full text-white py-4  rounded-[8px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'>
                        {isSubmitting ? 'Creating...' : 'Create User'}
                    </button>
                </form>
            </div>
           
        </div>
    )
}





