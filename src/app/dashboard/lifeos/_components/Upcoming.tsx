import React from "react";
import { ITimelineEvent as CalendarEvent, ITask as Task } from "@/types/lifeos";
import { Clock, AlertCircle } from "lucide-react";

interface Props {
  events: CalendarEvent[];
  tasks: Task[];
}

export function Upcoming({ events, tasks }: Props) {
  return (
    <section className="flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-2">Upcoming</h2>
      
      <div className="flex flex-col gap-4">
        {/* Mock overdue item */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-400">Quarterly Review</p>
            <p className="text-xs text-red-600 dark:text-red-500">2 days overdue</p>
          </div>
        </div>

        {/* Mock upcoming events */}
        <div className="flex items-start gap-3 p-3">
          <Clock className="w-5 h-5 text-neutral-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">DSA Mock Interview</p>
            <p className="text-xs text-neutral-500">Tomorrow at 10:00 AM</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3">
          <Clock className="w-5 h-5 text-neutral-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Publish Newsletter</p>
            <p className="text-xs text-neutral-500">Friday</p>
          </div>
        </div>
      </div>
    </section>
  );
}
