import React from "react";
import { AlertTriangle, Clock } from "lucide-react";

export function AttentionCenter() {
  const issues = [
    { type: "overdue", title: "Quarterly Review", subtitle: "2 days overdue" },
    { type: "deadline", title: "Project Proposal", subtitle: "Due at 5:00 PM" },
  ];

  if (issues.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 p-6 rounded-3xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-medium text-red-800 dark:text-red-400 font-serif">Needs Attention</h2>
      </div>
      
      <div className="flex flex-col gap-3 mt-2">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-red-100/50 dark:border-red-900/20">
            {issue.type === "overdue" ? (
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{issue.title}</p>
              <p className={`text-xs mt-0.5 ${issue.type === "overdue" ? "text-red-600 dark:text-red-400" : "text-orange-600 dark:text-orange-400"}`}>
                {issue.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
