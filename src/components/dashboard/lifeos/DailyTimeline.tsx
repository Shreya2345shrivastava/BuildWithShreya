"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { ITimelineEvent } from "@/types/lifeos";
import { Modal } from "./Modal";
import { TimelineForm } from "./TimelineForm";

interface Props {
  events?: ITimelineEvent[];
}

export function DailyTimeline({ events = [] }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<ITimelineEvent | null>(null);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
          <Clock size={20} className="text-[var(--color-text-secondary)]" />
          <h2 className="text-xl font-medium tracking-tight">Daily Timeline</h2>
        </div>
      </div>

      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
        {sortedEvents.length === 0 ? (
          <div className="text-center text-[var(--color-text-muted)] text-sm py-4">
            No events scheduled for today.
          </div>
        ) : (
          <div className="relative border-l border-[var(--color-border-subtle)] ml-2 space-y-6">
            {sortedEvents.map((item) => {
              const timeString = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(item.startTime));
              const durationMs = new Date(item.endTime).getTime() - new Date(item.startTime).getTime();
              const durationMins = Math.round(durationMs / 60000);
              const durationStr = durationMins >= 60 ? `${(durationMins / 60).toFixed(1)}h` : `${durationMins}m`;

              return (
                <div key={item._id} className={`relative pl-6 flex items-start gap-4 ${item.completed ? 'opacity-60' : ''}`}>
                  {/* Dot */}
                  <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-surface-elevated)] ${item.completed ? 'bg-[var(--color-botanical-leaf)]' : 'bg-[var(--color-border-strong)]'}`}></div>
                  
                  <div className="w-20 shrink-0 text-sm font-medium text-[var(--color-text-muted)] pt-0.5">
                    {timeString}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedEvent(item)}
                    className="flex-1 bg-[var(--color-surface-primary)] hover:bg-[var(--color-surface-elevated-hover)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] transition-all rounded-xl p-3 flex flex-col justify-center text-left cursor-pointer active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-medium ${item.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                        {item.title}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] font-medium">{durationStr}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title="Edit Event">
        {/* We reuse TimelineForm but would ideally pass initialData. 
            For now, we just mount the form, a fully robust version would pre-populate values. */}
        <TimelineForm onSuccess={() => setSelectedEvent(null)} initialData={selectedEvent} />
      </Modal>
    </div>
  );
}
