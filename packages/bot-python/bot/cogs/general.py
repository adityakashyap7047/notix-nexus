import time
import platform

import psutil
import disnake
from disnake.ext import commands


class General(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.start_time = time.time()

    @commands.slash_command(description="Check bot latency")
    async def ping(self, inter: disnake.ApplicationCommandInteraction):
        latency = round(self.bot.latency * 1000)
        embed = disnake.Embed(title="🏓 Pong!", color=0x00F5FF)
        embed.add_field(name="Latency", value=f"{latency}ms", inline=True)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Bot information")
    async def botinfo(self, inter: disnake.ApplicationCommandInteraction):
        uptime_secs = int(time.time() - self.start_time)
        hours, remainder = divmod(uptime_secs, 3600)
        minutes, seconds = divmod(remainder, 60)
        embed = disnake.Embed(title="ℹ️ Bot Info", color=0x00F5FF)
        embed.add_field(name="Bot", value=self.bot.user.name, inline=True)
        embed.add_field(name="Servers", value=str(len(self.bot.guilds)), inline=True)
        embed.add_field(name="Users", value=str(sum(g.member_count or 0 for g in self.bot.guilds)), inline=True)
        embed.add_field(name="Uptime", value=f"{hours}h {minutes}m {seconds}s", inline=True)
        embed.add_field(name="Python", value=platform.python_version(), inline=True)
        embed.add_field(name="Latency", value=f"{round(self.bot.latency * 1000)}ms", inline=True)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Server information")
    async def serverinfo(self, inter: disnake.ApplicationCommandInteraction):
        guild = inter.guild
        embed = disnake.Embed(title=f"📡 {guild.name}", color=0x00F5FF)
        embed.add_field(name="Owner", value=guild.owner.mention if guild.owner else "Unknown", inline=True)
        embed.add_field(name="Members", value=str(guild.member_count), inline=True)
        embed.add_field(name="Channels", value=str(len(guild.channels)), inline=True)
        embed.add_field(name="Roles", value=str(len(guild.roles)), inline=True)
        embed.add_field(name="Boosts", value=str(guild.premium_subscription_count), inline=True)
        if guild.icon:
            embed.set_thumbnail(url=guild.icon.url)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="User information")
    async def userinfo(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member = None):
        member = member or inter.author
        embed = disnake.Embed(title=f"👤 {member.name}", color=0x00F5FF)
        embed.set_thumbnail(url=member.display_avatar.url)
        embed.add_field(name="ID", value=str(member.id), inline=True)
        embed.add_field(name="Joined", value=member.joined_at.strftime("%Y-%m-%d") if member.joined_at else "Unknown", inline=True)
        embed.add_field(name="Account Created", value=member.created_at.strftime("%Y-%m-%d"), inline=True)
        embed.add_field(name="Roles", value=", ".join(r.name for r in member.roles[1:5]) if len(member.roles) > 1 else "None", inline=False)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Get a user's avatar")
    async def avatar(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member = None):
        member = member or inter.author
        embed = disnake.Embed(title=f"🖼️ {member.name}'s Avatar", color=0x00F5FF)
        embed.set_image(url=member.display_avatar.url)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Get system stats")
    async def system(self, inter: disnake.ApplicationCommandInteraction):
        cpu = psutil.cpu_percent()
        mem = psutil.virtual_memory()
        embed = disnake.Embed(title="🖥️ System Stats", color=0x00F5FF)
        embed.add_field(name="CPU", value=f"{cpu}%", inline=True)
        embed.add_field(name="Memory", value=f"{mem.percent}% ({mem.used // (1024**2)}MB / {mem.total // (1024**2)}MB)", inline=True)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="8ball magic responses")
    async def ball(self, inter: disnake.ApplicationCommandInteraction, question: str):
        responses = [
            "Yes.", "No.", "Maybe.", "Ask again later.", "Definitely!",
            "No way!", "I think so.", "Absolutely not.", "Could be.", "Signs point to yes.",
        ]
        embed = disnake.Embed(title="🎱 Magic 8-Ball", color=0x8B5CF6)
        embed.add_field(name="Question", value=question, inline=False)
        embed.add_field(name="Answer", value=f"*{responses[hash(question) % len(responses)]}*", inline=False)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Roll a dice")
    async def roll(self, inter: disnake.ApplicationCommandInteraction, sides: int = 6):
        import random
        result = random.randint(1, sides)
        await inter.response.send_message(f"🎲 You rolled a **{result}** (1-{sides})")


def setup(bot):
    bot.add_cog(General(bot))
