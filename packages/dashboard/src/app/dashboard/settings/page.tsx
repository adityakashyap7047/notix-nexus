"use client";

import { useState } from "react";

interface Setting {
  name: string;
  description: string;
  enabled: boolean;
}

const initialModules: Setting[] = [
  { name: "Welcome Messages", description: "Send a message when a member joins", enabled: true },
  { name: "Goodbye Messages", description: "Send a message when a member leaves", enabled: true },
  { name: "Auto-Role", description: "Automatically assign roles to new members", enabled: true },
  { name: "Logging", description: "Log mod actions, message edits and deletes", enabled: true },
  { name: "Starboard", description: "Pin popular messages to a starboard", enabled: false },
  { name: "Voice Roles", description: "Auto-assign roles when in voice channels", enabled: false },
  { name: "AFK System", description: "Set AFK status and notify mentions", enabled: true },
  { name: "Music Player", description: "Play music in voice channels", enabled: true },
];

export default function SettingsPage() {
  const [prefix, setPrefix] = useState("!");
  const [language, setLanguage] = useState("en");
  const [modules, setModules] = useState(initialModules);
  const [welcomeChannel, setWelcomeChannel] = useState("#welcome");
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome {user} to {server}! You are member #{count}. 🎉");
  const [goodbyeMessage, setGoodbyeMessage] = useState("Goodbye {user}! We'll miss you. 😢");
  const [logChannel, setLogChannel] = useState("#mod-logs");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleModule = (index: number) => {
    setModules((prev) =>
      prev.map((m, i) => (i === index ? { ...m, enabled: !m.enabled } : m))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">SERVER SETTINGS</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">Bot configuration & preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">GENERAL</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">BOT PREFIX</label>
              <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} className="nexus-input" maxLength={5} />
              <p className="text-[10px] text-gray-500 font-mono mt-1">Used for legacy commands. Slash commands always work.</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">LANGUAGE</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="nexus-select">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">LOG CHANNEL</label>
              <select value={logChannel} onChange={(e) => setLogChannel(e.target.value)} className="nexus-select">
                <option value="#mod-logs">#mod-logs</option>
                <option value="#audit-log">#audit-log</option>
                <option value="#bot-logs">#bot-logs</option>
              </select>
            </div>
            <button className="nexus-button w-full text-xs font-mono tracking-wider">SAVE SETTINGS</button>
          </div>
        </div>

        {/* Module Toggles */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">MODULES</h3>
          <div className="space-y-2">
            {modules.map((m, i) => (
              <div key={m.name} className="flex items-center justify-between p-3 bg-nexus-bg rounded-lg border border-nexus-border">
                <div className="min-w-0 mr-3">
                  <p className="text-sm text-white truncate">{m.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{m.description}</p>
                </div>
                <button onClick={() => toggleModule(i)} className={`toggle ${m.enabled ? "active" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome/Goodbye Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-green mb-4 tracking-wider">WELCOME MESSAGE</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">CHANNEL</label>
              <select value={welcomeChannel} onChange={(e) => setWelcomeChannel(e.target.value)} className="nexus-select text-xs">
                <option value="#welcome">#welcome</option>
                <option value="#general">#general</option>
                <option value="#lobby">#lobby</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">MESSAGE</label>
              <textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="nexus-textarea text-xs"
                rows={3}
              />
              <p className="text-[10px] text-gray-600 font-mono mt-1">Variables: {"{user}"} {"{server}"} {"{count}"}</p>
            </div>
            <div className="p-3 bg-nexus-bg rounded-lg border border-neon-green/20">
              <p className="text-[10px] text-gray-500 font-mono mb-1">PREVIEW</p>
              <p className="text-xs text-gray-300">
                {welcomeMessage.replace("{user}", "@CyberNinja").replace("{server}", "NEXUS HQ").replace("{count}", "24,892")}
              </p>
            </div>
          </div>
        </div>

        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-red mb-4 tracking-wider">GOODBYE MESSAGE</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-mono block mb-1">MESSAGE</label>
              <textarea
                value={goodbyeMessage}
                onChange={(e) => setGoodbyeMessage(e.target.value)}
                className="nexus-textarea text-xs"
                rows={3}
              />
              <p className="text-[10px] text-gray-600 font-mono mt-1">Variables: {"{user}"} {"{server}"} {"{count}"}</p>
            </div>
            <div className="p-3 bg-nexus-bg rounded-lg border border-neon-red/20">
              <p className="text-[10px] text-gray-500 font-mono mb-1">PREVIEW</p>
              <p className="text-xs text-gray-300">
                {goodbyeMessage.replace("{user}", "CyberNinja").replace("{server}", "NEXUS HQ").replace("{count}", "24,891")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="nexus-card p-5 border-neon-red/20">
        <h3 className="text-sm font-mono text-neon-red mb-4 tracking-wider">⚠️ DANGER ZONE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-nexus-bg rounded-lg border border-neon-red/10">
            <p className="text-sm text-white font-mono mb-1">Reset All Settings</p>
            <p className="text-[10px] text-gray-500 mb-3">Restore everything to default values</p>
            <button onClick={() => setShowResetConfirm(true)} className="nexus-button-danger text-xs w-full py-2">
              RESET SETTINGS
            </button>
          </div>
          <div className="p-4 bg-nexus-bg rounded-lg border border-neon-red/10">
            <p className="text-sm text-white font-mono mb-1">Remove Bot</p>
            <p className="text-[10px] text-gray-500 mb-3">Remove the bot from this server</p>
            <button className="nexus-button-danger text-xs w-full py-2">REMOVE BOT</button>
          </div>
        </div>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="nexus-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="nexus-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-neon-red font-mono mb-3">⚠️ RESET ALL SETTINGS?</h3>
            <p className="text-sm text-gray-400 mb-4">This will reset all settings to their default values. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetConfirm(false)} className="nexus-button-danger flex-1">CONFIRM RESET</button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 px-4 py-2 rounded-lg border border-nexus-border text-gray-400 text-sm font-mono hover:bg-nexus-surface transition-colors">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
