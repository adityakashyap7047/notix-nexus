import time
import logging
from collections import defaultdict

import disnake
from disnake.ext import commands

logger = logging.getLogger("Security")

raid_data = defaultdict(lambda: {"joins": [], "messages": []})


class Security(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.anti_raid_enabled = True
        self.max_joins_per_10s = 5
        self.max_messages_per_5s = 8
        self.spam_links = ["discord.gg/", "discord.com/invite/", "tinyurl.com", "bit.ly/"]

    @commands.Cog.listener()
    async def on_member_join(self, member):
        if not self.anti_raid_enabled:
            return
        now = time.time()
        guild_id = member.guild.id
        raid_data[guild_id]["joins"].append(now)
        raid_data[guild_id]["joins"] = [t for t in raid_data[guild_id]["joins"] if now - t < 10]
        if len(raid_data[guild_id]["joins"]) >= self.max_joins_per_10s:
            try:
                await member.guild.default_role.edit(permissions=disnake.Permissions(send_messages=False))
                channel = member.guild.system_channel
                if channel:
                    await channel.send("⚠️ **RAID DETECTED** — Channel permissions locked.")
                logger.warning(f"Raid detected in {member.guild.name}")
            except Exception as e:
                logger.error(f"Raid protection error: {e}")

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.bot or not message.guild:
            return
        now = time.time()
        author_id = message.author.id
        raid_data[author_id]["messages"].append(now)
        raid_data[author_id]["messages"] = [t for t in raid_data[author_id]["messages"] if now - t < 5]
        if len(raid_data[author_id]["messages"]) >= self.max_messages_per_5s:
            try:
                timeout_duration = 300
                await message.author.timeout(duration=timeout_duration, reason="Auto-mod: Flood detected")
                await message.channel.send(f"🔒 {message.author.mention} has been muted for flooding.", delete_after=5)
                await message.delete()
            except Exception:
                pass
        lower_content = message.content.lower()
        if any(link in lower_content for link in self.spam_links):
            if not message.author.guild_permissions.manage_messages:
                try:
                    await message.delete()
                    await message.channel.send(f"🚫 {message.author.mention}, links are not allowed.", delete_after=5)
                except Exception:
                    pass

    @commands.slash_command(description="Lockdown the server")
    @commands.has_permissions(administrator=True)
    async def lockdown(self, inter: disnake.ApplicationCommandInteraction, reason: str = "No reason"):
        for channel in inter.guild.channels:
            try:
                await channel.set_permissions(inter.guild.default_role, send_messages=False)
            except Exception:
                pass
        embed = disnake.Embed(title="🔒 LOCKDOWN", description=f"Server locked down.\n**Reason:** {reason}", color=0xFF3B5C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="End server lockdown")
    @commands.has_permissions(administrator=True)
    async def unlockdown(self, inter: disnake.ApplicationCommandInteraction):
        for channel in inter.guild.channels:
            try:
                await channel.set_permissions(inter.guild.default_role, send_messages=True)
            except Exception:
                pass
        embed = disnake.Embed(title="🔓 UNLOCKED", description="Lockdown has been lifted.", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Check security status")
    async def securitystatus(self, inter: disnake.ApplicationCommandInteraction):
        embed = disnake.Embed(title="🛡️ Security Status", color=0x00F5FF)
        embed.add_field(name="Anti-Raid", value="✅ Active" if self.anti_raid_enabled else "❌ Inactive", inline=True)
        embed.add_field(name="Link Filter", value="✅ Active", inline=True)
        embed.add_field(name="Flood Protection", value="✅ Active", inline=True)
        await inter.response.send_message(embed=embed)


def setup(bot):
    bot.add_cog(Security(bot))
