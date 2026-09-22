"use client";

const events = [
  { type: "USER_JOIN", user: "CyberNinja", detail: "Joined Server", time: "2m ago", color: "bg-neon-green" },
  { type: "MODERATION", user: "Admin", detail: "Warned User", time: "5m ago", color: "bg-yellow-500" },
  { type: "SECURITY", user: "SYSTEM", detail: "Threat Neutralized", time: "8m ago", color: "bg-neon-red" },
  { type: "MESSAGE", user: "DevMaster", detail: "#general", time: "12m ago", color: "bg-neon-cyan" },
  { type: "TICKET", user: "SupportBot", detail: "Ticket Closed", time: "15m ago", color: "bg-neon-purple" },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-2">
      {events.map((event, i) => (
        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-nexus-bg transition-colors">
          <div className={`w-2 h-2 rounded-full ${event.color}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-neon-cyan">{event.type}</span>
              <span className="text-xs text-gray-500">- {event.user}</span>
            </div>
            <p className="text-xs text-gray-500 truncate">{event.detail}</p>
          </div>
          <span className="text-[10px] text-gray-500 font-mono whitespace-nowrap">{event.time}</span>
        </div>
      ))}
    </div>
  );
}
