"use client";

import * as React from "react";
import { format } from "date-fns";
import { CirclePlus } from "lucide-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IAttraction } from "@models/attraction";

type AddDateButtonProps = {
  addAction: (attraction: IAttraction, newDate: Date | undefined) => void;
  dateRange: DateRange | undefined;
  attraction: IAttraction;
};

const AddDateButton: React.FC<AddDateButtonProps> = ({
  addAction,
  dateRange,
  attraction,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("12:00");
  const start = dateRange?.from ? dateRange.from : new Date();
  const end = dateRange?.to ? dateRange.to : new Date();

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate); // Deselect the date
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  const handleConfirm = () => {
    if (date) {
      let [hours, minutes] = [0, 0];
      if (time) {
        [hours, minutes] = time.split(":").map(Number);
      }
      console.log(hours, minutes);
      const dateTime = new Date(date);
      dateTime.setHours(hours, minutes);
      addAction(attraction, dateTime);
    } else {
      addAction(attraction, undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-white w-fit justify-start text-left font-inter bg-gray-700/50 hover:bg-gray-700 hover:text-blue-500",
            !date && "text-yellow-300"
          )}
        >
          {date ? (
            format(date, "PPP") + " " + (time ? time : "")
          ) : (
            <span>
              <CirclePlus />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={{ before: start, after: end }}
          defaultMonth={start}
          initialFocus
        />
        <div className="p-4">
          <TimePicker onChange={handleTimeChange} value={time} disableClock />
          <Button onClick={handleConfirm} className="mt-2">
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddDateButton;
