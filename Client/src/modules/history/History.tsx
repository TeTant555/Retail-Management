"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Chart from "./chunks/Chart";
import { DataTable } from "./chunks/DataTable";
import { Footer } from "@/components/footer";

const History = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div>
      <div className="pb-11 pt-11 w-screen">
        <div className="w-screen mb-6 container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <p className="text-pri text-3xl crimson-pro">Orders</p>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] mt-2 pl-3 text-pri p-2 font-semibold border-pri border-2 montserrat hover:bg-pri hover:text-black transition-colors duration-300",
                  !date && "text-txt"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-4 z-50 bg-bgu border rounded-lg shadow-lg"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="text-txt montserrat shadow-sm w-full bg-bgu"
                classNames={{
                  months: "flex flex-col space-y-4",
                  month: "space-y-4",
                  caption: "flex justify-center text-pri pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-pri text-md crimson-pro rounded-md w-9 font-normal",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-pri/10",
                  day: "h-9 w-9 p-0 font-semibold aria-selected:opacity-100 rounded-md bg-bgu",
                  day_selected:
                    "bg-pri text-black hover:bg-pri aria-selected:bg-pri",
                  day_today: "border border-pri",
                  day_disabled: "text-muted cursor-not-allowed opacity-50",
                  day_outside: "text-muted opacity-50",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Chart />
        </div>
        <div className="container mt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <DataTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;
