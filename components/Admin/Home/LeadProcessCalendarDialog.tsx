import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useUpdateScheduleTimeMutation } from "@/redux/features/dashboardOverview/dashboardOverView";

interface LeadProcessCalendarDialogProps {
  isOpen: boolean;
  ID?: string;
  onClose: () => void;
  onSave?: (dateTime: any) => void;
}

export function LeadProcessCalendarDialog({
  ID,
  isOpen,
  onClose,
  onSave,
}: LeadProcessCalendarDialogProps) {
  const [hours, setHours] = useState("09");
  const [minutes, setMinutes] = useState("00");
  const [ampm, setAmpm] = useState<"AM" | "PM">("PM");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [updateSchedule, { isLoading }] = useUpdateScheduleTimeMutation();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSave = async () => {
    if (!ID || !selectedDate) return;

    let h = parseInt(hours || "0", 10);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    const scheduledTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      h,
      parseInt(minutes || "0", 10)
    );

    try {
      await updateSchedule({
        id: ID,
        scheduled_time: scheduledTime.toISOString(),
      }).unwrap();

      if (onSave) onSave(scheduledTime);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[400px] p-0 rounded-2xl overflow-hidden border-0 gap-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-[#040C0B]">Set a Time</h2>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 bg-[#F4F5F7] rounded-lg p-4 text-center">
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value.replace(/\D/, "").slice(0, 2))}
                className="w-full bg-transparent text-center text-3xl font-semibold text-[#040C0B] outline-none"
              />
            </div>
            <span className="text-3xl font-semibold text-[#040C0B] pb-2">:</span>
            <div className="flex-1 bg-[#F4F5F7] rounded-lg p-4 text-center">
              <input
                type="text"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value.replace(/\D/, "").slice(0, 2))}
                className="w-full bg-transparent text-center text-3xl font-semibold text-[#040C0B] outline-none"
              />
            </div>
            <div className="flex flex-col rounded-lg border border-[#E9E9EA] overflow-hidden">
              <button
                className={`px-3 py-2 text-sm font-medium ${
                  ampm === "PM" ? "bg-[#E3F2F1] text-[#0E93A1]" : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setAmpm("PM")}
              >
                PM
              </button>
              <div className="h-[1px] bg-[#E9E9EA]"></div>
              <button
                className={`px-3 py-2 text-sm font-medium ${
                  ampm === "AM" ? "bg-[#E3F2F1] text-[#0E93A1]" : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setAmpm("AM")}
              >
                AM
              </button>
            </div>
          </div>

          <h2 className="text-xl font-medium text-[#040C0B] mb-6">Set a Date</h2>

          <div className="flex justify-between items-center mb-6 px-2">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="text-gray-500 hover:text-black">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[#040C0B] font-medium">
              {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            </span>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="text-gray-500 hover:text-black">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
              <div key={idx} className="text-center text-sm text-gray-500 font-medium py-2">{day}</div>
            ))}
            {Array.from({ length: startDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="py-2" />
            ))}
            {daysArray.map((day) => {
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`py-2 text-sm text-center rounded-full mx-auto w-8 h-8 flex items-center justify-center ${
                    isSelected ? "bg-[#0E93A1] text-white font-bold" : "text-[#040C0B] hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 p-6 pt-0 mt-4">
          <button onClick={onClose} className="flex-1 py-3 px-4 rounded-full border border-[#0E93A1] text-[#0E93A1] font-medium hover:bg-[#E3F2F1]">
            Cancel
          </button>
          <button onClick={handleSave} disabled={isLoading} className="flex-1 py-3 px-4 rounded-full bg-[#0E93A1] text-white font-medium hover:bg-[#0b7680] disabled:opacity-50">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
