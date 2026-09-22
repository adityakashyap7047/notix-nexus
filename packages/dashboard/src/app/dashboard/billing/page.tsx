"use client";
import { useState } from "react";
import { clsx } from "clsx";

type PlanTier = "free" | "pro" | "business";

interface Plan {
  id: PlanTier;
  name: string;
  price: string;
  period: string;
  features: string[];
  limits: { [key: string]: string };
  color: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "FREE",
    price: "$0",
    period: "forever",
    color: "gray",
    features: ["5 Servers", "1,000 Members", "Basic Moderation", "Community Support", "5 Webhooks", "7-Day Logs"],
    limits: { servers: "5", members: "1,000", webhooks: "5", logs: "7 days" },
  },
  {
    id: "pro",
    name: "PRO",
    price: "$12",
    period: "/month",
    color: "neon-cyan",
    popular: true,
    features: ["25 Servers", "50,000 Members", "Advanced Moderation", "Priority Support", "50 Webhooks", "30-Day Logs", "AI Commands", "Custom Automations", "Analytics Dashboard"],
    limits: { servers: "25", members: "50,000", webhooks: "50", logs: "30 days" },
  },
  {
    id: "business",
    name: "BUSINESS",
    price: "$49",
    period: "/month",
    color: "neon-purple",
    features: ["Unlimited Servers", "Unlimited Members", "Enterprise Moderation", "Dedicated Support", "Unlimited Webhooks", "90-Day Logs", "Advanced AI", "Custom Integrations", "SLA Guarantee", "White Label"],
    limits: { servers: "Unlimited", members: "Unlimited", webhooks: "Unlimited", logs: "90 days" },
  },
];

const usageStats = [
  { label: "Servers Used", current: 12, max: 25, unit: "" },
  { label: "API Calls", current: 847392, max: 1000000, unit: "/mo" },
  { label: "Webhooks", current: 5, max: 50, unit: "" },
  { label: "Storage", current: 2.4, max: 10, unit: "GB" },
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanTier>("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const activePlan = plans.find((p) => p.id === currentPlan)!;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">BILLING</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">SUBSCRIPTION & USAGE MANAGEMENT</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setBillingCycle("monthly")} className={clsx("px-3 py-1.5 rounded-lg text-xs font-mono border transition-all", billingCycle === "monthly" ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "border-nexus-border text-gray-500")}>
            MONTHLY
          </button>
          <button onClick={() => setBillingCycle("yearly")} className={clsx("px-3 py-1.5 rounded-lg text-xs font-mono border transition-all", billingCycle === "yearly" ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan" : "border-nexus-border text-gray-500")}>
            YEARLY <span className="text-neon-green ml-1">-20%</span>
          </button>
        </div>
      </div>

      <div className="nexus-card p-6 glow-cyan">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono text-gray-500 tracking-wider mb-1">CURRENT PLAN</p>
            <h2 className="text-3xl font-bold font-mono text-white">{activePlan.name}</h2>
            <p className="text-sm font-mono text-gray-400 mt-1">
              {activePlan.price}{activePlan.period} • Renews {billingCycle === "monthly" ? "Oct 21, 2026" : "Sep 21, 2027"}
            </p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <span className="text-2xl font-bold text-nexus-bg">{activePlan.name[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono text-neon-cyan mb-3 tracking-wider">USAGE STATS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {usageStats.map((stat) => {
            const percent = Math.round((stat.current / stat.max) * 100);
            return (
              <div key={stat.label} className="nexus-card p-4">
                <p className="text-[10px] font-mono text-gray-500 tracking-wider mb-2">{stat.label.toUpperCase()}</p>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-bold font-mono text-white">
                    {typeof stat.current === "number" && stat.current > 10000 ? `${(stat.current / 1000000).toFixed(1)}M` : stat.current}{stat.unit}
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    / {typeof stat.max === "number" && stat.max > 10000 ? `${(stat.max / 1000000).toFixed(0)}M` : stat.max}{stat.unit}
                  </span>
                </div>
                <div className="w-full h-2 bg-nexus-bg rounded-full overflow-hidden">
                  <div
                    className={clsx("h-full rounded-full transition-all", percent > 90 ? "bg-neon-red" : percent > 70 ? "bg-yellow-500" : "bg-neon-green")}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] font-mono text-gray-500 mt-1">{percent}% used</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono text-neon-cyan mb-3 tracking-wider">CHOOSE PLAN</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = currentPlan === plan.id;
            const yearlyPrice = plan.id === "free" ? "$0" : `$${Math.round(parseInt(plan.price.slice(1)) * 0.8 * 12)}`;
            return (
              <div
                key={plan.id}
                className={clsx(
                  "nexus-card p-6 relative transition-all duration-300",
                  isActive && "glow-cyan border-neon-cyan/30",
                  plan.popular && !isActive && "border-neon-cyan/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-[10px] font-mono text-neon-cyan">
                    MOST POPULAR
                  </div>
                )}
                {isActive && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded bg-neon-green/10 border border-neon-green/30 text-[10px] font-mono text-neon-green">
                    CURRENT
                  </div>
                )}
                <h3 className={`text-xl font-bold font-mono text-${plan.color === "gray" ? "gray-300" : plan.color} mb-1`}>{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white font-mono">{billingCycle === "monthly" ? plan.price : yearlyPrice}</span>
                  <span className="text-xs text-gray-500 font-mono">{billingCycle === "monthly" ? plan.period : "/year"}</span>
                </div>
                <div className="space-y-2 mb-6">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                      <span className="text-xs font-mono text-gray-400">{feat}</span>
                    </div>
                  ))}
                </div>
                {!isActive && (
                  <button className={clsx("w-full py-2.5 rounded-lg font-mono text-sm transition-all", currentPlan === "free" || plans.findIndex((p) => p.id === currentPlan) < plans.findIndex((p) => p.id === plan.id) ? "bg-gradient-to-r from-neon-cyan to-neon-purple text-nexus-bg font-bold hover:shadow-lg hover:shadow-neon-cyan/25" : "border border-nexus-border text-gray-400 hover:bg-nexus-surface")}>
                    {plans.findIndex((p) => p.id === currentPlan) < plans.findIndex((p) => p.id === plan.id) ? "UPGRADE" : "DOWNGRADE"}
                  </button>
                )}
                {isActive && (
                  <div className="w-full py-2.5 rounded-lg border border-neon-green/30 bg-neon-green/5 text-center font-mono text-sm text-neon-green">
                    ACTIVE
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="nexus-card p-6">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">BILLING HISTORY</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nexus-border">
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">DATE</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">DESCRIPTION</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">AMOUNT</th>
                <th className="text-left px-4 py-3 text-[10px] font-mono text-gray-500">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "Sep 21, 2026", desc: "PRO Plan - Monthly", amount: "$12.00", status: "paid" },
                { date: "Aug 21, 2026", desc: "PRO Plan - Monthly", amount: "$12.00", status: "paid" },
                { date: "Jul 21, 2026", desc: "PRO Plan - Monthly", amount: "$12.00", status: "paid" },
                { date: "Jun 21, 2026", desc: "Upgrade: FREE → PRO", amount: "$12.00", status: "paid" },
              ].map((item, i) => (
                <tr key={i} className="border-b border-nexus-border/50 hover:bg-nexus-surface/50 transition-colors font-mono text-xs">
                  <td className="px-4 py-3 text-gray-500">{item.date}</td>
                  <td className="px-4 py-3 text-white">{item.desc}</td>
                  <td className="px-4 py-3 text-white">{item.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-neon-green/10 text-neon-green border border-neon-green/20">
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
