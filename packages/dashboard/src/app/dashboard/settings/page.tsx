"use client";

import Sidebar from "../../../components/layout/Sidebar";

const groups = [
  { title: "GENERAL", settings: [{ name: "Bot Prefix", value: "/", type: "input" }, { name: "Language", value: "English", type: "select" }] },
  { title: "MODULES", settings: [{ name: "Core Commands", value: true, type: "toggle" }, { name: "Moderation", value: true, type: "toggle" }, { name: "Security", value: true, type: "toggle" }, { name: "AI System", value: true, type: "toggle" }] },
];

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-white font-mono tracking-wider">SERVER SETTINGS</h1>
          </div>
          {groups.map((g) => (
            <div key={g.title} className="nexus-card p-4">
              <h3 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">{g.title}</h3>
              <div className="space-y-3">
                {g.settings.map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-3 bg-[#080B12] rounded-lg">
                    <span className="text-sm text-white">{s.name}</span>
                    {s.type === "toggle" ? (
                      <div className={"toggle " + (s.value ? "active" : "")} />
                    ) : (
                      <span className="text-sm font-mono text-gray-500">{String(s.value)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="nexus-button">Save Changes</button>
        </div>
      </main>
    </div>
  );
}
