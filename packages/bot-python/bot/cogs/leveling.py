import random

import disnake
from disnake.ext import commands


class Leveling(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.xp_data = {}
        self.xp_per_message = 15

    def get_level(self, user_id):
        return self.xp_data.get(str(user_id), {"xp": 0, "level": 0})

    def add_xp(self, user_id, amount):
        uid = str(user_id)
        data = self.xp_data.get(uid, {"xp": 0, "level": 0})
        data["xp"] += amount
        xp_needed = (data["level"] + 1) * 100
        while data["xp"] >= xp_needed:
            data["xp"] -= xp_needed
            data["level"] += 1
            xp_needed = (data["level"] + 1) * 100
        self.xp_data[uid] = data
        return data

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.bot or not message.guild:
            return
        data = self.add_xp(message.author.id, self.xp_per_message)

    @commands.slash_command(description="Check your rank")
    async def rank(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member = None):
        member = member or inter.author
        data = self.get_level(member.id)
        xp_needed = (data["level"] + 1) * 100
        embed = disnake.Embed(title="📊 Rank", color=0x8B5CF6)
        embed.set_thumbnail(url=member.display_avatar.url)
        embed.add_field(name="User", value=member.mention, inline=True)
        embed.add_field(name="Level", value=str(data["level"]), inline=True)
        embed.add_field(name="XP", value=f"{data['xp']}/{xp_needed}", inline=True)
        bar_len = 20
        filled = int(bar_len * data["xp"] / xp_needed) if xp_needed > 0 else 0
        bar = "█" * filled + "░" * (bar_len - filled)
        embed.add_field(name="Progress", value=f"`{bar}`", inline=False)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Level leaderboard")
    async def levelleaderboard(self, inter: disnake.ApplicationCommandInteraction):
        sorted_users = sorted(self.xp_data.items(), key=lambda x: x[1]["level"], reverse=True)[:10]
        desc = ""
        for i, (uid, data) in enumerate(sorted_users, 1):
            try:
                user = self.bot.get_user(int(uid))
                name = user.name if user else uid
            except Exception:
                name = uid
            desc += f"**{i}.** {name} — Level **{data['level']}**\n"
        embed = disnake.Embed(title="🏆 Level Leaderboard", description=desc or "No data yet.", color=0x8B5CF6)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Set a user's level")
    @commands.has_permissions(administrator=True)
    async def setlevel(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, level: int):
        uid = str(member.id)
        data = self.xp_data.get(uid, {"xp": 0, "level": 0})
        data["level"] = level
        data["xp"] = 0
        self.xp_data[uid] = data
        await inter.response.send_message(f"Set {member.mention}'s level to **{level}**.", ephemeral=True)


def setup(bot):
    bot.add_cog(Leveling(bot))
