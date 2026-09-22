"use client";
import { useState } from "react";

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "paused" | "error";
  lastTriggered: string;
  failureCount: number;
}

interface ActivityEntry {
  webhook: string;
  event: string;
  status: "success" | "failed";
  timestamp: string;
  responseCode: number;
}

const mockWebhooks: Webhook[] = [
  { id: "wh_01", name: "Moderation Alert Hook", url: "https://hooks.example.com/mod/abc123", events: ["MODERATION", "SECURITY"], status: "active", lastTriggered: "2m ago", failureCount: 0 },
  { id: "wh_02", name: "Analytics Pipeline", url: "https://hooks.example.com/analytics/xyz789", events: ["MESSAGE", "USER_JOIN", "USER_LEAVE"], status: "active", lastTriggered: "15m ago", failureCount: 2 },
  { id: "wh_03", name: "Ticket Notifier", url: "https://hooks.example.com/tickets/def456", events: ["TICKET"], status: "paused", lastTriggered: "3h ago", failureCount: 0 },
  { id: "wh_04", name: "Security Monitor", url: "https://hooks.example.com/security/ghi012", events: ["SECURITY", "MODERATION"], status: "active", lastTriggered: "8m ago", failureCount: 0 },
  { id: "wh_05", name: "Logging Service", url: "https://hooks.example.com/logs/jkl345", events: ["ALL"], status: "error", lastTriggered: "1h ago", failureCount: 12 },
];

const mockActivity: ActivityEntry[] = [
  { webhook: "Moderation Alert Hook", event: "MODERATION", status: "success", timestamp: "14:32:05", responseCode: 200 },
  { webhook: "Analytics Pipeline", event: "MESSAGE", status: "success", timestamp: "14:31:42", responseCode: 200 },
  { webhook: "Security Monitor", event: "SECURITY", status: "success", timestamp: "14:31:18", responseCode: 200 },
  { webhook: "Logging Service", event: "ALL", status: "failed", timestamp: "14:30:55", responseCode: 500 },
  { webhook: "Analytics Pipeline", event: "USER_JOIN", status: "success", timestamp: "14:30:21", responseCode: 201 },
  { webhook: "Moderation Alert Hook", event: "MODERATION", status: "failed", timestamp: "14:29:48", responseCode: 503 },
  { webhook: "Ticket Notifier", event: "TICKET", status: "success", timestamp: "14:29:10", responseCode: 200 },
  { webhook: "Security Monitor", event: "SECURITY", status: "success", timestamp: "14:28:37", responseCode: 200 },
];

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [showForm, setShowForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ name: "", url: "", events: "" });
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean } | null>(null);

  const maskUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const pathParts = parsed.pathname.split("/");
      const last = pathParts[pathParts.length - 1];
      return `${parsed.hostname}/${pathParts.slice(1, -1).join("/")}/${"*".repeat(last.length)}`;
    } catch {
      return url.slice(0, 20) + "..." + url.slice(-6);
    }
  };

  const handleTest = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setTestResult({ id, success: Math.random() > 0.3 });
      setTimeout(() => setTestResult(null), 3000);
    }, 1500);
  };

  const handleCreate = () => {
    if (!newWebhook.name || !newWebhook.url) return;
    const created: Webhook = {
      id: `wh_${String(webhooks.length + 1).padStart(2, "0")}`,
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events.split(",").map((e) => e.trim().toUpperCase()),
      status: "active",
      lastTriggered: "never",
      failureCount: 0,
    };
    setWebhooks([created, ...webhooks]);
    setNewWebhook({ name: "", url: "", events: "" });
    setShowForm(false);
  };

  const toggleStatus = (id: string) => {
    setWebhooks(
      webhooks.map((wh) =>
        wh.id === id ? { ...wh, status: wh.status === "active" ? "paused" : "active" } : wh
      )
    );
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((wh) => wh.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">WEBHOOKS</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">MANAGE INCOMING & OUTGOING HOOKS</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="nexus-button text-sm">
          {showForm ? "CANCEL" : "+ NEW WEBHOOK"}
        </button>
      </div>

      {showForm && (
        <div className="nexus-card p-6 glow-cyan">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">CREATE WEBHOOK</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-1">NAME</label>
              <input
                type="text"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:border-neon-cyan focus:outline-none"
                placeholder="My Webhook"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-1">URL</label>
              <input
                type="url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:border-neon-cyan focus:outline-none"
                placeholder="https://hooks.example.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-1">EVENTS (comma-separated)</label>
              <input
                type="text"
                value={newWebhook.events}
                onChange={(e) => setNewWebhook({ ...newWebhook, events: e.target.value })}
                className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:border-neon-cyan focus:outline-none"
                placeholder="MODERATION, SECURITY"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleCreate} className="nexus-button text-sm">DEPLOY</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-nexus-border text-gray-400 text-sm font-mono hover:bg-nexus-surface transition-colors">CANCEL</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "TOTAL HOOKS", value: String(webhooks.length), color: "text-neon-cyan" },
          { label: "ACTIVE", value: String(webhooks.filter((w) => w.status === "active").length), color: "text-neon-green" },
          { label: "FAILED TODAY", value: String(webhooks.reduce((a, w) => a + w.failureCount, 0)), color: "text-neon-red" },
          { label: "SUCCESS RATE", value: "98.4%", color: "text-neon-green" },
        ].map((stat) => (
          <div key={stat.label} className="nexus-card p-4 text-center">
            <p className="text-[10px] font-mono text-gray-500 tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold font-mono ${stat.color} mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="nexus-card overflow-hidden">
        <div className="px-4 py-3 border-b border-nexus-border flex items-center justify-between">
          <h3 className="text-sm font-mono text-neon-cyan tracking-wider">WEBHOOK LIST</h3>
          <span className="text-[10px] font-mono text-gray-500">{webhooks.length} REGISTERED</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nexus-border">
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500 tracking-wider">NAME</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500 tracking-wider">ENDPOINT</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500 tracking-wider">EVENTS</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500 tracking-wider">STATUS</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500 tracking-wider">LAST FIRED</th>
                <th className="text-right px-4 py-3 text-[10px] font-mono text-gray-500 tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((wh) => (
                <tr key={wh.id} className="border-b border-nexus-border/50 hover:bg-nexus-surface/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-white text-xs">{wh.name}</td>
                  <td className="px-4 py-3 font-mono text-gray-500 text-xs">{maskUrl(wh.url)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {wh.events.map((ev) => (
                        <span key={ev} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${wh.status === "active" ? "bg-neon-green" : wh.status === "paused" ? "bg-yellow-500" : "bg-neon-red"}`} />
                      <span className={`text-xs font-mono uppercase ${wh.status === "active" ? "text-neon-green" : wh.status === "paused" ? "text-yellow-500" : "text-neon-red"}`}>
                        {wh.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{wh.lastTriggered}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleTest(wh.id)}
                        disabled={testingId === wh.id}
                        className="px-2 py-1 rounded text-[10px] font-mono border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-colors disabled:opacity-50"
                      >
                        {testingId === wh.id ? "TESTING..." : "TEST"}
                      </button>
                      <button
                        onClick={() => toggleStatus(wh.id)}
                        className="px-2 py-1 rounded text-[10px] font-mono border border-nexus-border text-gray-400 hover:bg-nexus-bg transition-colors"
                      >
                        {wh.status === "active" ? "PAUSE" : "RESUME"}
                      </button>
                      <button
                        onClick={() => deleteWebhook(wh.id)}
                        className="px-2 py-1 rounded text-[10px] font-mono border border-neon-red/30 text-neon-red hover:bg-neon-red/10 transition-colors"
                      >
                        DELETE
                      </button>
                    </div>
                    {testResult && testResult.id === wh.id && (
                      <span className={`block mt-1 text-[10px] font-mono ${testResult.success ? "text-neon-green" : "text-neon-red"}`}>
                        {testResult.success ? "200 OK" : "FAILED"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="nexus-card p-4">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">ACTIVITY LOG</h3>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {mockActivity.map((entry, i) => (
            <div key={i} className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-nexus-bg/50 transition-colors font-mono text-xs">
              <span className="text-gray-500 w-16">{entry.timestamp}</span>
              <span className={`w-2 h-2 rounded-full ${entry.status === "success" ? "bg-neon-green" : "bg-neon-red"}`} />
              <span className="text-neon-cyan w-20">{entry.event}</span>
              <span className="text-gray-400 flex-1">{entry.webhook}</span>
              <span className={entry.responseCode < 300 ? "text-neon-green" : "text-neon-red"}>{entry.responseCode}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
