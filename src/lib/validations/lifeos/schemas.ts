import { z } from "zod";

// Base schemas
export const GoalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string(),
  priority: z.enum(["P1", "P2", "P3", "P4"]),
  goalType: z.enum(["Year", "Quarter", "Month", "Week", "Today"]),
  startDate: z.coerce.date().optional(),
  targetDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  completedDate: z.coerce.date().optional(),
  estimatedHours: z.number().min(0).optional(),
  actualHours: z.number().min(0).optional(),
  status: z.enum(["not_started", "in_progress", "completed", "archived"]).default("not_started"),
  progress: z.number().min(0).max(100).default(0),
  parentGoalId: z.string().optional(), // Reference ID
  linkedTasks: z.array(z.string()).default([]),
  linkedHabits: z.array(z.string()).default([]),
  milestoneIds: z.array(z.string()).default([]),
  lifeAreaId: z.string().optional(),
  notes: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
});

const VisionAreaSchema = z.object({
  vision: z.string().optional().default(""),
  why: z.string().optional().default(""),
  currentState: z.string().optional().default(""),
  targetState: z.string().optional().default(""),
}).default({ vision: "", why: "", currentState: "", targetState: "" });

export const VisionSchema = z.object({
  lifeAreaId: z.string().optional(),
  career: VisionAreaSchema,
  financial: VisionAreaSchema,
  health: VisionAreaSchema,
  learning: VisionAreaSchema,
  creator: VisionAreaSchema,
  spiritual: VisionAreaSchema,
  relationships: VisionAreaSchema,
  lifestyle: VisionAreaSchema,
  userId: z.string().min(1),
});

export const HabitSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  lifeAreaId: z.string().optional(),
  linkedGoalIds: z.array(z.string()).default([]),
  frequency: z.enum(["daily","weekly","monthly","custom"]).default("daily"),
  targetCount: z.number().default(1),
  currentCount: z.number().default(0),
  unit: z.string().optional(),
  priority: z.enum(["P1","P2","P3","P4"]).optional(),
  status: z.enum(["Active","Paused","Completed","Archived"]).default("Active"),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  currentStreak: z.number().default(0),
  longestStreak: z.number().default(0),
  completionRate: z.number().min(0).max(100).default(0),
  completionHistory: z.array(z.object({
    date: z.coerce.date(),
    count: z.number().optional(),
    status: z.enum(["completed","partial","skipped","missed"]).optional()
  })).default([]),
  notes: z.string().optional(),
  userId: z.string().min(1),
});

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string(),
  priority: z.enum(["P1", "P2", "P3", "P4"]),
  status: z.enum(["not_started", "in_progress", "completed"]).default("not_started"),
  dueDate: z.date().optional(),
  scheduledTime: z.date().optional(),
  estimatedMinutes: z.number().optional(),
  actualMinutes: z.number().optional(),
  lifeAreaId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  completed: z.boolean().default(false),
  linkedGoalId: z.string().optional(),
  userId: z.string().min(1),
});

export const TimelineEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startTime: z.date(),
  endTime: z.date(),
  type: z.string(),
  completed: z.boolean().default(false),
  userId: z.string().min(1),
});

export const LifeAreaSchema = z.object({
  name: z.enum(["Health", "Learning", "Creator", "Spiritual", "Beauty", "Personal", "Career", "Relationships", "Finance"]),
  score: z.number().min(0).max(100).default(0),
  streak: z.number().default(0),
  progress: z.number().min(0).max(100).default(0),
  todayProgress: z.number().min(0).max(100).default(0),
  weeklyProgress: z.number().min(0).max(100).default(0),
  monthlyProgress: z.number().min(0).max(100).default(0),
  yearlyProgress: z.number().min(0).max(100).default(0),
  insights: z.string().optional(),
  userId: z.string().min(1),
});

export const StreakSchema = z.object({
  title: z.string().min(1, "Title is required"),
  days: z.number().default(0),
  lastCompleted: z.date().optional(),
  userId: z.string().min(1),
});

export const DailyMetricSchema = z.object({
  date: z.date(),
  water: z.number().default(0),
  studyMinutes: z.number().default(0),
  deepWorkMinutes: z.number().default(0),
  sleepHours: z.number().default(0),
  workoutMinutes: z.number().default(0),
  userId: z.string().min(1),
});

export const ReflectionSchema = z.object({
  date: z.date(),
  note: z.string().min(1, "Reflection note is required"),
  mood: z.string(),
  gratitude: z.string().optional(),
  userId: z.string().min(1),
});

export const MilestoneSchema = z.object({
  title: z.string().min(1),
  goalId: z.string().min(1),
  progress: z.number().min(0).max(100).default(0),
  status: z.enum(["not_started", "in_progress", "completed"]).default("not_started"),
  dueDate: z.date().optional(),
  completedDate: z.date().optional(),
  userId: z.string().min(1),
});

export const StudySessionSchema = z.object({
  topic: z.string().min(1),
  durationMinutes: z.number().min(1),
  date: z.date(),
  notes: z.string().optional(),
  userId: z.string().min(1),
});

export const HealthMetricSchema = z.object({
  date: z.date(),
  weight: z.number().optional(),
  calories: z.number().optional(),
  steps: z.number().optional(),
  waterOunces: z.number().optional(),
  userId: z.string().min(1),
});

export const BeautyRoutineSchema = z.object({
  date: z.date(),
  morningCompleted: z.boolean().default(false),
  eveningCompleted: z.boolean().default(false),
  notes: z.string().optional(),
  userId: z.string().min(1),
});

export const CreatorTaskSchema = z.object({
  title: z.string().min(1),
  platform: z.string(),
  status: z.enum(["idea", "scripting", "filming", "editing", "published"]),
  publishDate: z.date().optional(),
  url: z.string().url().optional(),
  userId: z.string().min(1),
});

export const JournalEntrySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  date: z.date(),
  userId: z.string().min(1),
});

export const DailyReviewSchema = z.object({
  date: z.date(),
  rating: z.number().min(1).max(10),
  wins: z.array(z.string()).default([]),
  improvements: z.array(z.string()).default([]),
  userId: z.string().min(1),
});

export const WeeklyReviewSchema = z.object({
  weekStartDate: z.date(),
  rating: z.number().min(1).max(10),
  summary: z.string().optional(),
  goalsMet: z.number().default(0),
  userId: z.string().min(1),
});

export const MonthlyReviewSchema = z.object({
  month: z.string(), // e.g., "2026-09"
  rating: z.number().min(1).max(10),
  summary: z.string().optional(),
  userId: z.string().min(1),
});

export const QuarterlyReviewSchema = z.object({
  quarter: z.string(), // e.g., "2026-Q3"
  rating: z.number().min(1).max(10),
  summary: z.string().optional(),
  userId: z.string().min(1),
});

export const YearlyReviewSchema = z.object({
  year: z.number(),
  rating: z.number().min(1).max(10),
  summary: z.string().optional(),
  userId: z.string().min(1),
});
