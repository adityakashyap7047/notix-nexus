import { Events, ActivityType } from "discord.js";
import { NexusClient } from "../index";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: NexusClient) {
    console.log(`[NOTIXNEX] Online as ${client.user?.tag}`);
    client.user?.setPresence({
      status: "online",
      activities: [{ name: "NOTIXNEX v2.0", type: ActivityType.Watching }],
    });
    setInterval(() => {
      const mem = process.memoryUsage().heapUsed / 1024 / 1024;
      if (mem > 800 && global.gc) global.gc();
    }, 60000);
  },
};
