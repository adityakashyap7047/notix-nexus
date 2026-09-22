"use client";

import { useState } from "react";

interface Workflow {
  id: number;
  name: string;
  enabled: boolean;
  trigger: string;
  actions: number;
  runs: number;
}

const initialWorkflows: Workflow[] = [
  { id: 1, name: "Welcome New Members", enabled: true, trigger: "Member Join", actions: 3, runs: 1247 },
  { id: 2, name: "Auto-Assign Roles", enabled: true, trigger: "Verification", actions: 2, runs: 892 },
  { id: 3, name: "Raid Alert", enabled: true, trigger: "Security Event", actions: 4, runs: 23 },
  { id: 4, name: "Daily Announcement", enabled: false, trigger: "Scheduled", actions: 1, runs: 47 },
  { id: 5, name: "Bump Reminder", enabled: true, trigger: "Scheduled (2h)", actions: 1, runs: 384 },
  { id: 6, name: "AFK Return Notification", enabled: true, trigger: "Message Send", actions: 2, runs: 2341 },
];

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows);

  const toggleWorkflow = (id: number) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, enabled: !wf.enabled } : wf))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">AUTOMATION ENGINE</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">Visual workflow builder</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500">ACTIVE</span>
          <span className="text-sm font-mono text-neon-green font-bold">{workflows.filter((w) => w.enabled).length}</span>
        </div>
      </div>

      {/* Workflow Builder Preview */}
      <div className="nexus-card p-6">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">WORKFLOW BUILDER</h3>
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <div className="flex-shrink-0 p-4 bg-nexus-bg rounded-lg border border-neon-cyan/30 min-w-[140px]">
            <p className="text-[10px] text-neon-cyan font-mono mb-1">TRIGGER</p>
            <p className="text-sm text-white">Member Joins</p>
          </div>
          <div className="text-neon-cyan font-mono text-lg">→</div>
          <div className="flex-shrink-0 p-4 bg-nexus-bg rounded-lg border border-neon-yellow/30 min-w-[140px]">
            <p className="text-[10px] text-neon-yellow font-mono mb-1">CONDITION</p>
            <p className="text-sm text-white">Account &gt; 7d</p>
          </div>
          <div className="text-neon-cyan font-mono text-lg">→</div>
          <div className="flex-shrink-0 p-4 bg-nexus-bg rounded-lg border border-neon-green/30 min-w-[140px]">
            <p className="text-[10px] text-neon-green font-mono mb-1">ACTION</p>
            <p className="text-sm text-white">Send Welcome</p>
          </div>
          <div className="text-neon-cyan font-mono text-lg">→</div>
          <div className="flex-shrink-0 p-4 bg-nexus-bg rounded-lg border border-neon-green/30 min-w-[140px]">
            <p className="text-[10px] text-neon-green font-mono mb-1">ACTION</p>
            <p className="text-sm text-white">Assign Role</p>
          </div>
        </div>
      </div>

      {/* Active Workflows */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">ACTIVE WORKFLOWS</h3>
        <div className="space-y-3">
          {workflows.map((wf) => (
            <div key={wf.id} className="flex items-center gap-4 p-4 bg-nexus-bg rounded-lg border border-nexus-border">
              <button onClick={() => toggleWorkflow(wf.id)} className={`toggle ${wf.enabled ? "active" : ""}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-white">{wf.name}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-neon-cyan">Trigger: {wf.trigger}</span>
                  <span className="text-xs text-gray-500">{wf.actions} actions</span>
                </div>
              </div>
              <span className="text-sm font-mono text-neon-green flex-shrink-0">{wf.runs.toLocaleString()} runs</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
