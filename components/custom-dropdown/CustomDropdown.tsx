import React, { useState, useRef, useEffect } from 'react';
import Dot3Icon from '@/components/icons/admin/Dot3Icon';


export interface CustomDropdownItem {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
}

interface CustomDropdownProps {
  trigger?: React.ReactNode;
  items: CustomDropdownItem[];
  containerClassName?: string;
  menuClassName?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ trigger, items, containerClassName = '', menuClassName = '' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Dropdown placement logic
  const [dropUp, setDropUp] = useState(false);
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // If not enough space below, open upwards
      setDropUp(rect.bottom + 160 > windowHeight); // 160px is menu height buffer
    }
  }, [open]);

  return (
    <div className={`relative flex justify-center w-full ${containerClassName}`} ref={ref}>
      <button
        className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {trigger || <Dot3Icon />}
      </button>
      {open && (
        <div
          className={`absolute right-0 z-50 w-40 bg-popover text-popover-foreground border rounded-md p-1 shadow-md ${menuClassName} ${dropUp ? 'bottom-full mb-2' : 'mt-2'}`}
          style={{ minWidth: '8rem' }}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              className={`relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none w-full text-left transition-colors duration-100 hover:bg-[#e9e9ea] hover:text-black focus:text-black ${item.className || ''}`}
              onClick={() => { setOpen(false); item.onClick(); }}
              type="button"
              style={{ fontWeight: 400 }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
