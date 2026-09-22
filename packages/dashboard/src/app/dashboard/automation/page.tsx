"use client";

import { useState } from "react";

const triggers = [
  { id: "member_join", name: "Member Joins", icon: "◈", color: "border-neon-green/30 bg-neon-green/5" },
  { id: "message_sent", name: "Message Sent", icon: "◎", color: "border-neon-cyan/30 bg-neon-cyan/5" },
  { id: "role_added", name: "Role Added", icon: "◇", color: "border-neon-purple/30 bg-neon-purple/5" },
  { id: "role_removed", name: "Role Removed", icon: "◆", color: "border-neon-red/30 bg-neon-red/5" },
  { id: "reaction_added", name: "Reaction Added", icon: "⬡", color: "border-yellow-400/30 bg-yellow-400/5" },
  { id: "voice_join", name: "Voice Join", icon: "◎", color: "border-neon-blue/30 bg-neon-blue/5" },
  { id: "message_edit", name: "Message Edited", icon: "◈", color: "border-neon-cyan/30 bg-neon-cyan/5" },
  { id: "message_delete", name: "Message Deleted", icon: "◇", color: "border-neon-red/30 bg-neon-red/5" },
];

const actions = [
  { id: "send_message", name: "Send Message", icon: "◈", color: "border-neon-cyan/30 bg-neon-cyan/5" },
  { id: "assign_role", name: "Assign Role", icon: "◎", color: "border-neon-purple/30 bg-neon-purple/5" },
  { id: "remove_role", name: "Remove Role", icon: "◇", color: "border-neon-red/30 bg-neon-red/5" },
  { id: "timeout_user", name: "Timeout User", icon: "◆", color: "border-yellow-400/30 bg-yellow-400/5" },
  { id: "delete_message", name: "Delete Message", icon: "◇", color: "border-neon-red/30 bg-neon-red/5" },
  { id: "add_reaction", name: "Add Reaction", icon: "⬡", color: "border-neon-green/30 bg-neon-green/5" },
  { id: "log_event", name: "Log Event", icon: "◈", color: "border-neon-blue/30 bg-neon-blue/5" },
  { id: "dm_user", name: "DM User", icon: "◎", color: "border-neon-purple/30 bg-neon-purple/5" },
];

const activeRules = [
  { name: "Welcome Message", trigger: "Member Joins", actions: 2, enabled: true, lastTriggered: "2 min ago" },
  { name: "Auto-Mod Spam", trigger: "Message Sent", actions: 3, enabled: true, lastTriggered: "15 min ago" },
  { name: "Role Gate", trigger: "Reaction Added", actions: 2, enabled: true, lastTriggered: "1 hr ago" },
  { name: "Voice Log", trigger: "Voice Join", actions: 1, enabled: false, lastTriggered: "3 hr ago" },
  { name: "Anti-Raid", trigger: "Member Joins", actions: 4, enabled: true, lastTriggered: "6 hr ago" },
  { name: "DM Welcome", trigger: "Member Joins", actions: 1, enabled: true, lastTriggered: "12 hr ago" },
];

const ruleHistory = [
  { rule: "Welcome Message", event: "xNexusDev joined", time: "2 min ago", status: "success" },
  { rule: "Auto-Mod Spam", event: "Spam detected from User123", time: "15 min ago", status: "success" },
  { rule: "Role Gate", event: "Reaction in #verify", time: "1 hr ago", status: "success" },
  { rule: "Anti-Raid", event: "Raid detected (5 joins/30s)", time: "6 hr ago", status: "warning" },
  { rule: "DM Welcome", event: "CryptoQueen joined", time: "12 hr ago", status: "success" },
  { rule: "Auto-Mod Spam", event: "False positive - ignored", time: "1 day ago", status: "error" },
];

export default function AutomationPage() {
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const toggleAction = (id: string) => {
    setSelectedActions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-nexus-bg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">AUTOMATION ENGINE</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">Visual workflow builder &amp; rules</p>
        </div>
        <button className="nexus-button text-xs font-mono tracking-wider">
          + NEW RULE
        </button>
      </div>

      <div className="nexus-card p-5">
        <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider mb-4">WORKFLOW BUILDER</h2>
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <div className={`flex-shrink-0 w-40 p-3 rounded-lg border-2 border-dashed transition-all ${
            selectedTrigger ? "border-neon-green bg-neon-green/5" : "border-nexus-border bg-nexus-bg"
          }`}>
            <p className="text-[10px] text-gray-500 font-mono mb-1">TRIGGER</p>
            <p className="text-xs font-mono text-white">
              {selectedTrigger ? triggers.find((t) => t.id === selectedTrigger)?.name : "Select trigger..."}
            </p>
          </div>

          <div className="flex-shrink-0 text-neon-cyan/30 text-lg">→</div>

          <div className="flex-shrink-0 w-40 p-3 rounded-lg border-2 border-dashed border-nexus-border bg-nexus-bg">
            <p className="text-[10px] text-gray-500 font-mono mb-1">CONDITION</p>
            <p className="text-xs font-mono text-gray-600">No conditions</p>
          </div>

          <div className="flex-shrink-0 text-neon-cyan/30 text-lg">→</div>

          <div className={`flex-shrink-0 w-40 p-3 rounded-lg border-2 border-dashed transition-all ${
            selectedActions.length > 0 ? "border-neon-purple bg-neon-purple/5" : "border-nexus-border bg-nexus-bg"
          }`}>
            <p className="text-[10px] text-gray-500 font-mono mb-1">ACTIONS ({selectedActions.length})</p>
            <p className="text-xs font-mono text-white">
              {selectedActions.length > 0
                ? `${selectedActions.length} action(s) selected`
                : "Select actions..."}
            </p>
          </div>

          <div className="flex-shrink-0 text-neon-cyan/30 text-lg">→</div>

          <div className="flex-shrink-0 w-24 p-3 rounded-lg border-2 border-dashed border-nexus-border bg-nexus-bg text-center">
            <p className="text-[10px] text-gray-500 font-mono mb-1">END</p>
            <p className="text-xs font-mono text-gray-600">◆</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nexus-card p-5">
          <h2 className="text-sm font-bold text-neon-green font-mono tracking-wider mb-4">TRIGGERS</h2>
          <div className="grid grid-cols-2 gap-3">
            {triggers.map((trigger) => (
              <button
                key={trigger.id}
                onClick={() => setSelectedTrigger(trigger.id === selectedTrigger ? null : trigger.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedTrigger === trigger.id
                    ? "border-neon-green bg-neon-green/10 shadow-[0_0_15px_rgba(0,255,156,0.1)]"
                    : trigger.color + " hover:border-opacity-60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-neon-green">{trigger.icon}</span>
                  <span className="text-xs font-mono text-white">{trigger.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="nexus-card p-5">
          <h2 className="text-sm font-bold text-neon-purple font-mono tracking-wider mb-4">ACTIONS</h2>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedActions.includes(action.id)
                    ? "border-neon-purple bg-neon-purple/10 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                    : action.color + " hover:border-opacity-60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-neon-purple">{action.icon}</span>
                  <span className="text-xs font-mono text-white">{action.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nexus-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider">ACTIVE RULES</h2>
            <span className="text-xs text-gray-500 font-mono">{activeRules.length} RULES</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-nexus-border">
                  <th className="text-left text-xs text-gray-500 font-mono pb-3">NAME</th>
                  <th className="text-left text-xs text-gray-500 font-mono pb-3">TRIGGER</th>
                  <th className="text-center text-xs text-gray-500 font-mono pb-3">ACTIONS</th>
                  <th className="text-center text-xs text-gray-500 font-mono pb-3">STATUS</th>
                  <th className="text-right text-xs text-gray-500 font-mono pb-3">LAST</th>
                </tr>
              </thead>
              <tbody>
                {activeRules.map((rule, i) => (
                  <tr key={i} className="border-b border-nexus-border/50 hover:bg-nexus-bg/50 transition-colors">
                    <td className="py-3 text-sm font-mono text-white">{rule.name}</td>
                    <td className="py-3 text-xs font-mono text-neon-green">{rule.trigger}</td>
                    <td className="py-3 text-center text-xs font-mono text-neon-purple">{rule.actions}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono ${
                        rule.enabled ? "text-neon-green" : "text-gray-500"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${rule.enabled ? "bg-neon-green" : "bg-gray-500"}`} />
                        {rule.enabled ? "ON" : "OFF"}
                      </span>
                    </td>
                    <td className="py-3 text-right text-[10px] font-mono text-gray-500">{rule.lastTriggered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="nexus-card p-5">
          <h2 className="text-sm font-bold text-neon-purple font-mono tracking-wider mb-4">RULE HISTORY</h2>
          <div className="space-y-2">
            {ruleHistory.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border/50"
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  entry.status === "success"
                    ? "bg-neon-green"
                    : entry.status === "warning"
                    ? "bg-yellow-400"
                    : "bg-neon-red"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-white truncate">{entry.rule}</p>
                  <p className="text-[10px] font-mono text-gray-500 truncate">{entry.event}</p>
                </div>
                <span className="text-[10px] font-mono text-gray-600 flex-shrink-0">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
