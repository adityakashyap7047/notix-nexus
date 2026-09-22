"use client";

import Sidebar from "../../../components/layout/Sidebar";

const workflows = [
  { name: "Welcome New Members", enabled: true, trigger: "Member Join", actions: 3, runs: 1247 },
  { name: "Auto-Assign Roles", enabled: true, trigger: "Verification", actions: 2, runs: 892 },
  { name: "Raid Alert", enabled: true, trigger: "Security Event", actions: 4, runs: 23 },
  { name: "Daily Announcement", enabled: false, trigger: "Scheduled", actions: 1, runs: 47 },
];

export default function AutomationsPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400 font-mono tracking-wider">AUTOMATION ENGINE</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">Visual workflow builder</p>
          </div>
          <div className="nexus-card p-6">
            <h3 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">WORKFLOW BUILDER</h3>
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              <div className="flex-shrink-0 p-4 bg-[#080B12] rounded-lg border border-cyan-400/30 min-w-[140px]">
                <p className="text-[10px] text-cyan-400 font-mono mb-1">TRIGGER</p>
                <p className="text-sm text-white">Member Joins</p>
              </div>
              <div className="text-cyan-400 font-mono">{"->"}</div>
              <div className="flex-shrink-0 p-4 bg-[#080B12] rounded-lg border border-yellow-400/30 min-w-[140px]">
                <p className="text-[10px] text-yellow-400 font-mono mb-1">CONDITION</p>
                <p className="text-sm text-white">Account &gt; 7d</p>
              </div>
              <div className="text-cyan-400 font-mono">{"->"}</div>
              <div className="flex-shrink-0 p-4 bg-[#080B12] rounded-lg border border-green-400/30 min-w-[140px]">
                <p className="text-[10px] text-green-400 font-mono mb-1">ACTION</p>
                <p className="text-sm text-white">Send Welcome</p>
              </div>
              <div className="text-cyan-400 font-mono">{"->"}</div>
              <div className="flex-shrink-0 p-4 bg-[#080B12] rounded-lg border border-green-400/30 min-w-[140px]">
                <p className="text-[10px] text-green-400 font-mono mb-1">ACTION</p>
                <p className="text-sm text-white">Assign Role</p>
              </div>
            </div>
          </div>
          <div className="nexus-card p-4">
            <h3 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">ACTIVE WORKFLOWS</h3>
            <div className="space-y-3">
              {workflows.map((wf) => (
                <div key={wf.name} className="flex items-center gap-4 p-4 bg-[#080B12] rounded-lg">
                  <div className={"toggle " + (wf.enabled ? "active" : "")} />
                  <div className="flex-1">
                    <p className="text-sm font-mono text-white">{wf.name}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-cyan-400">Trigger: {wf.trigger}</span>
                      <span className="text-xs text-gray-500">{wf.actions} actions</span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-green-400">{wf.runs} runs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
