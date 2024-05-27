import { Flag } from "lucide-react";
import React, { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { tripReportOptions } from "./reportOptions";
import { getReportReason } from "@lib/reports";

interface ReportFormProps {
  id: string;
  snitchId: string;
  reportAction: (
    formData: Iterable<readonly [PropertyKey, any]>
  ) => Promise<void>;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

const ReportForm: React.FC<ReportFormProps> = ({
  id,
  snitchId,
  reportAction,
  popoverRef,
}) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await reportAction(formData);

    if (popoverRef && popoverRef.current) {
      popoverRef.current.style.display = "none";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="hidden" name="snitchId" value={snitchId} />
      <Input type="hidden" name="id" value={id} />
      <Label htmlFor="reason">Report</Label>
      <Select name="reason" required>
        <SelectTrigger className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <SelectValue placeholder="Select Reason" />
        </SelectTrigger>
        <SelectContent id="reason">
          <SelectGroup>
            {tripReportOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full mt-2" variant="destructive">
        Send
      </Button>
    </form>
  );
};

const Report: React.FC<ReportFormProps> = ({ id, snitchId, reportAction }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-fit h-fit p-0 hover:scale-105">
          <Flag size={20} color="#f10404" />
        </Button>
      </PopoverTrigger>
      <PopoverContent ref={popoverRef} className="w-80">
        <ReportForm
          id={id}
          snitchId={snitchId}
          reportAction={reportAction}
          popoverRef={popoverRef}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Report;
