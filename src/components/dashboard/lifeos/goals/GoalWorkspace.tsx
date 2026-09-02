"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IGoal, ITask } from "@/types/lifeos";
import { X, Save, Plus, Target, CheckCircle2, Circle, AlertTriangle, ArrowLeft } from "lucide-react";
import { updateGoal, deleteGoal } from "@/lib/actions/lifeos/goals.actions";
import { getMilestones, createMilestone, updateMilestone, deleteMilestone } from "@/lib/actions/lifeos/milestones.actions";
import { getTasksByGoalId } from "@/lib/actions/lifeos/tasks.actions";

interface Props {
  goalId: string;
  onClose: () => void;
  goals: IGoal[];
  onDeleteRequest: () => void;
}

export function GoalWorkspace({ goalId, onClose, goals, onDeleteRequest }: Props) {
  const [goal, setGoal] = useState<IGoal | null>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Edit State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [lifeAreaId, setLifeAreaId] = useState("");
  const [goalType, setGoalType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number | "">("");
  const [actualHours, setActualHours] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [progress, setProgress] = useState(0);

  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const foundGoal = goals.find(g => g._id === goalId);
      if (foundGoal) {
        setGoal(foundGoal);
        setTitle(foundGoal.title);
        setDescription(foundGoal.description || "");
        setPriority(foundGoal.priority);
        setStatus(foundGoal.status);
        setLifeAreaId(foundGoal.lifeAreaId || "");
        setGoalType(foundGoal.goalType);
        setStartDate(foundGoal.startDate ? new Date(foundGoal.startDate).toISOString().split('T')[0] : "");
        setDueDate(foundGoal.dueDate ? new Date(foundGoal.dueDate).toISOString().split('T')[0] : "");
        setEstimatedHours(foundGoal.estimatedHours ?? "");
        setActualHours(foundGoal.actualHours ?? "");
        setProgress(foundGoal.progress ?? 0);
        setNotes(foundGoal.notes || "");

        // Fetch Connections
        const m = await getMilestones(goalId);
        setMilestones(m);
        const t = await getTasksByGoalId(goalId);
        setTasks(t);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [goalId, goals]);

  const handleSave = async () => {
    setSaving(true);
    await updateGoal(goalId, { 
      title, description, priority, status, lifeAreaId, goalType: goalType as any, 
      notes, progress,
      startDate: startDate ? new Date(startDate) : undefined, 
      dueDate: dueDate ? new Date(dueDate) : undefined, 
      estimatedHours: estimatedHours === "" ? undefined : estimatedHours, 
      actualHours: actualHours === "" ? undefined : actualHours 
    });
    setSaving(false);
  };

  const handleDelete = () => {
    onDeleteRequest();
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    await createMilestone({ title: newMilestoneTitle, goalId, date: new Date() });
    setNewMilestoneTitle("");
    const m = await getMilestones(goalId);
    setMilestones(m);
  };

  const handleToggleMilestone = async (mId: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "not_started" : "completed";
    await updateMilestone(mId, { status: newStatus });
    const m = await getMilestones(goalId);
    setMilestones(m);
  };

  const handleDeleteMilestone = async (mId: string) => {
    await deleteMilestone(mId);
    const m = await getMilestones(goalId);
    setMilestones(m);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {loading ? (
            <div className="p-8 flex flex-col gap-6 animate-pulse h-full">
              <div className="h-8 bg-[var(--color-border-soft)] rounded w-1/4"></div>
              <div className="h-64 bg-[var(--color-border-soft)] rounded w-full"></div>
            </div>
          ) : goal ? (
            <>
              {/* Header */}
              <div className="bg-[var(--color-surface-primary)] border-b border-[var(--color-border-subtle)] px-8 py-5 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-6">
                  <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-full hover:bg-[var(--color-surface-elevated)] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[var(--color-accent-peach)]" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">{goal.goalType} Goal</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleDelete} className="px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-full text-sm font-medium transition-colors">
                    Delete
                  </button>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent-peach)] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow">
                    <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* Layout Body */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] flex flex-row md:flex-col gap-2 p-2 md:p-4 shrink-0 overflow-x-auto md:overflow-y-auto hide-scrollbar">
                  <SidebarButton id="overview" label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                  <SidebarButton id="milestones" label="Milestones" active={activeTab === "milestones"} onClick={() => setActiveTab("milestones")} />
                  <SidebarButton id="tasks" label="Linked Tasks" active={activeTab === "tasks"} onClick={() => setActiveTab("tasks")} />
                  <SidebarButton id="habits" label="Linked Habits" active={activeTab === "habits"} onClick={() => setActiveTab("habits")} />
                  <SidebarButton id="notes" label="Notes & Thoughts" active={activeTab === "notes"} onClick={() => setActiveTab("notes")} />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
                  
                  <div className="max-w-3xl mx-auto flex flex-col gap-12">
                    
                    {/* Goal Title & Basic Setup (always visible if overview or notes) */}
                    {(activeTab === "overview" || activeTab === "notes") && (
                      <div className="flex flex-col gap-6">
                        <input 
                          type="text" 
                          value={title} 
                          onChange={e => setTitle(e.target.value)}
                          className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-text-primary)] bg-transparent border-none outline-none placeholder:text-[var(--color-text-muted)] w-full leading-tight"
                          placeholder="Goal Title"
                        />
                      </div>
                    )}

                    {/* Tabs Content */}
                    {activeTab === "overview" && (
                      <div className="flex flex-col gap-10">
                        {/* 1. Overview */}
                        <div className="flex flex-col gap-6 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-6 rounded-xl">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] pb-2">Overview</h3>
                          
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Description & Why</label>
                            <textarea 
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              placeholder="Why is this goal important? What does success look like?"
                              rows={3}
                              className="w-full bg-transparent border-none text-[var(--color-text-primary)] text-base focus:outline-none placeholder:text-[var(--color-text-muted)] resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Status</label>
                              <select value={status} onChange={e => setStatus(e.target.value)} className="bg-transparent border-none text-[var(--color-text-primary)] font-medium outline-none">
                                <option value="not_started">Planned</option>
                                <option value="in_progress">Active</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Priority</label>
                              <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-transparent border-none text-[var(--color-text-primary)] font-medium outline-none">
                                <option value="P1">P1 - Highest</option>
                                <option value="P2">P2 - High</option>
                                <option value="P3">P3 - Medium</option>
                                <option value="P4">P4 - Low</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* 2. Planning */}
                        <div className="flex flex-col gap-6 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-6 rounded-xl">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] pb-2">Planning</h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Start Date</label>
                              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg text-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Due Date</label>
                              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg text-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Estimated Hours</label>
                              <input type="number" min="0" value={estimatedHours} onChange={e => setEstimatedHours(e.target.value ? Number(e.target.value) : "")} className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg text-sm" placeholder="e.g. 50" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Actual Hours</label>
                              <input type="number" min="0" value={actualHours} onChange={e => setActualHours(e.target.value ? Number(e.target.value) : "")} className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg text-sm" placeholder="e.g. 10" />
                            </div>
                          </div>
                        </div>

                        {/* 3. Classification */}
                        <div className="flex flex-col gap-6 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-6 rounded-xl">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] pb-2">Classification</h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Goal Type</label>
                              <select value={goalType} onChange={e => setGoalType(e.target.value)} className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg text-sm">
                                <option value="Year">Year Goal</option>
                                <option value="Quarter">Quarter Goal</option>
                                <option value="Month">Month Goal</option>
                                <option value="Week">Week Goal</option>
                                <option value="Today">Today Goal</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Life Area</label>
                              <select value={lifeAreaId} onChange={e => setLifeAreaId(e.target.value)} className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg text-sm">
                                <option value="">Uncategorized</option>
                                <option value="career">Career & Work</option>
                                <option value="financial">Financial</option>
                                <option value="health">Health & Vitality</option>
                                <option value="learning">Learning</option>
                                <option value="creator">Creator</option>
                                <option value="spiritual">Spiritual</option>
                                <option value="relationships">Relationships</option>
                                <option value="lifestyle">Lifestyle</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* 4. Progress */}
                        <div className="flex flex-col gap-6 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-6 rounded-xl">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] pb-2">Progress</h3>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">Manual Progress Override</label>
                              <span className="text-sm font-bold text-[var(--color-accent-peach)]">{progress}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={progress} 
                              onChange={e => setProgress(Number(e.target.value))}
                              className="w-full accent-[var(--color-accent-peach)]"
                            />
                            <p className="text-xs text-[var(--color-text-muted)] mt-1">
                              You can manually update this, or it will automatically calculate based on completed milestones.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "milestones" && (
                      <div className="flex flex-col gap-8">
                        <div>
                          <h2 className="text-2xl font-serif text-[var(--color-text-primary)] mb-2">Milestones</h2>
                          <p className="text-sm text-[var(--color-text-muted)]">Break this goal down into manageable steps.</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          {milestones.map(m => (
                            <div key={m._id} className="flex items-center justify-between p-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl group hover:border-[var(--color-text-secondary)] transition-all shadow-sm">
                              <div className="flex items-center gap-4">
                                <button onClick={() => handleToggleMilestone(m._id, m.status)} className="text-[var(--color-text-muted)] hover:text-[var(--color-botanical-leaf)] transition-colors">
                                  {m.status === "completed" ? <CheckCircle2 className="w-6 h-6 text-[var(--color-botanical-leaf)]" /> : <Circle className="w-6 h-6" />}
                                </button>
                                <span className={`text-base ${m.status === "completed" ? "line-through text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)] font-medium"}`}>{m.title}</span>
                              </div>
                              <button onClick={() => handleDeleteMilestone(m._id)} className="opacity-0 group-hover:opacity-100 p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                          {milestones.length === 0 && (
                            <div className="p-8 border border-dashed border-[var(--color-border-strong)] rounded-xl flex flex-col items-center justify-center text-center gap-3">
                              <Target className="w-8 h-8 text-[var(--color-border-strong)]" />
                              <p className="text-sm text-[var(--color-text-muted)]">No milestones defined yet.</p>
                            </div>
                          )}
                        </div>

                        <form onSubmit={handleAddMilestone} className="flex items-center gap-3">
                          <input 
                            type="text" 
                            value={newMilestoneTitle}
                            onChange={e => setNewMilestoneTitle(e.target.value)}
                            placeholder="Type a new milestone and press enter..."
                            className="flex-1 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-base rounded-xl px-5 py-4 outline-none focus:border-[var(--color-accent-peach)] transition-colors shadow-sm"
                          />
                          <button type="submit" disabled={!newMilestoneTitle.trim()} className="p-4 bg-[var(--color-bg-peach-tint)] text-[var(--color-accent-peach)] rounded-xl disabled:opacity-50 hover:bg-[var(--color-accent-peach)] hover:text-white transition-colors">
                            <Plus className="w-6 h-6" />
                          </button>
                        </form>
                      </div>
                    )}

                    {activeTab === "tasks" && (
                      <div className="flex flex-col gap-8">
                        <div>
                          <h2 className="text-2xl font-serif text-[var(--color-text-primary)] mb-2">Linked Tasks</h2>
                          <p className="text-sm text-[var(--color-text-muted)]">Tasks across your Daily Planner associated with this goal.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          {tasks.map(t => (
                            <div key={t._id} className="flex items-center justify-between p-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl shadow-sm">
                              <div className="flex items-center gap-4">
                                {t.completed ? <CheckCircle2 className="w-5 h-5 text-[var(--color-botanical-leaf)]" /> : <Circle className="w-5 h-5 text-[var(--color-text-muted)]" />}
                                <span className={`text-base ${t.completed ? "line-through text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)] font-medium"}`}>{t.title}</span>
                              </div>
                              <span className="text-xs uppercase tracking-widest bg-[var(--color-surface-primary)] px-2 py-1 rounded text-[var(--color-text-muted)] font-bold">{t.category}</span>
                            </div>
                          ))}
                          {tasks.length === 0 && (
                            <div className="p-8 border border-dashed border-[var(--color-border-strong)] rounded-xl flex flex-col items-center justify-center text-center gap-3">
                              <CheckCircle2 className="w-8 h-8 text-[var(--color-border-strong)]" />
                              <p className="text-sm text-[var(--color-text-muted)]">No tasks linked. You can link tasks from the Daily Planner.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "habits" && (
                      <div className="flex flex-col gap-8">
                        <div>
                          <h2 className="text-2xl font-serif text-[var(--color-text-primary)] mb-2">Linked Habits</h2>
                          <p className="text-sm text-[var(--color-text-muted)]">Habits supporting this goal will appear here.</p>
                        </div>
                        <div className="p-8 border border-dashed border-[var(--color-border-strong)] rounded-xl flex flex-col items-center justify-center text-center gap-3">
                          <Circle className="w-8 h-8 text-[var(--color-border-strong)]" />
                          <p className="text-sm text-[var(--color-text-muted)]">Habit engine integration coming in next phase.</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "notes" && (
                      <div className="flex flex-col gap-6">
                        <label className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Research, Links & Notes</label>
                        <textarea 
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                          placeholder="Jot down any thoughts, links, or resources..."
                          rows={15}
                          className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl p-6 text-[var(--color-text-primary)] text-base leading-relaxed focus:outline-none focus:border-[var(--color-text-secondary)] transition-colors resize-none shadow-sm"
                        />
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-[var(--color-text-muted)] flex items-center justify-center h-full text-lg">Goal not found.</div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function SidebarButton({ id, label, active, onClick }: { id: string, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full whitespace-nowrap text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? 'bg-[var(--color-surface-primary)] text-[var(--color-accent-peach)] shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-primary)]/50'}`}
    >
      {label}
    </button>
  );
}
