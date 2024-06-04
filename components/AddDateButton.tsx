"use client";

import "react-time-picker/dist/TimePicker.css";
import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import { CirclePlus } from "lucide-react";
import * as React from "react";
import { DateRange, DayPicker } from "react-day-picker";
import TimePicker from "react-time-picker";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IAttraction } from "@models/attraction";

type AddDateButtonProps = {
  currentDate?: Date | undefined;
  addAction: (attraction: IAttraction, newDate: Date | undefined) => void;
  dateRange: DateRange | undefined;
  attraction: IAttraction;
};

const AddDateButton: React.FC<AddDateButtonProps> = ({
  currentDate = undefined,
  addAction,
  dateRange,
  attraction,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(currentDate);
  const [time, setTime] = React.useState<string>(
    `${currentDate?.getHours() || "12"}:${currentDate?.getMinutes() || "00"}`
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const start = dateRange?.from ? dateRange.from : new Date();
  const end = dateRange?.to ? dateRange.to : new Date();

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      let [hours, minutes] = [0, 0];
      if (time) {
        [hours, minutes] = time.split(":").map(Number);
      }
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hours, minutes);
      addAction(attraction, dateTime);
    } else {
      addAction(attraction, undefined);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (date) {
      let [hours, minutes] = [0, 0];
      if (newTime) {
        [hours, minutes] = newTime.split(":").map(Number);
      }
      const dateTime = new Date(date);
      dateTime.setHours(hours, minutes);
      addAction(attraction, dateTime);
    }
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
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
        <div className="pb-4 pl-5">
          <TimePicker onChange={handleTimeChange} value={time} disableClock />
          <Button
            variant="outline"
            onClick={handleConfirm}
            className="mx-2 h-8 rounded-xl"
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddDateButton;
