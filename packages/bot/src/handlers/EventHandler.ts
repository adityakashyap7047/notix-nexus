import { NexusClient, Event } from "../index";
import { readdirSync } from "fs";
import { join } from "path";

export class EventHandler {
  private client: NexusClient;
  constructor(client: NexusClient) { this.client = client; }

  async loadEvents(): Promise<void> {
    const eventsPath = join(__dirname, "../events");
    const files = readdirSync(eventsPath).filter((f) => f.endsWith(".ts") || f.endsWith(".js"));
    for (const file of files) {
      const mod = require(join(eventsPath, file));
      const event: Event = mod.default || mod;
      if (event.once) {
        this.client.once(event.name, (...args: any[]) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args: any[]) => event.execute(...args));
      }
    }
  }
}
