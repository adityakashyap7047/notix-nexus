import { NexusClient } from "../index";
import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

export class CommandHandler {
  private client: NexusClient;
  constructor(client: NexusClient) { this.client = client; }

  async loadCommands(): Promise<void> {
    const commandsPath = join(__dirname, "../commands");
    const categories = readdirSync(commandsPath);
    for (const category of categories) {
      const categoryPath = join(commandsPath, category);
      const files = readdirSync(categoryPath).filter((f) => f.endsWith(".ts") || f.endsWith(".js"));
      for (const file of files) {
        const mod = require(join(categoryPath, file));
        const cmd: Command = mod.default || mod;
        cmd.category = category;
        this.client.commands.set(cmd.name, cmd);
        if (cmd.aliases) {
          for (const alias of cmd.aliases) this.client.aliases.set(alias, cmd.name);
        }
      }
    }
    await this.registerSlashCommands();
  }

  async registerSlashCommands(): Promise<void> {
    const commands = this.client.commands
      .filter((c) => !c.devOnly)
      .map((c) => ({
        name: c.name,
        description: c.description,
        options: c.options || [],
        dm_permission: false,
      }));
    const rest = new REST({ version: "10" }).setToken(this.client.config.token);
    try {
      await rest.put(Routes.applicationCommands(this.client.config.clientId), { body: commands });
    } catch (error) {
      console.error("Failed to register commands:", error);
    }
  }
}

interface Command {
  name: string;
  aliases?: string[];
  description: string;
  category: string;
  options?: any[];
  execute: (message: any, args: string[], client: NexusClient) => Promise<void>;
  devOnly?: boolean;
}
