import disnake
from disnake.ext import commands


class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Kick a member")
    @commands.has_permissions(kick_members=True)
    async def kick(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, reason: str = "No reason"):
        await member.kick(reason=reason)
        embed = disnake.Embed(title="Kicked", description=f"{member.mention} was kicked.\n**Reason:** {reason}", color=0xFF3B5C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Ban a member")
    @commands.has_permissions(ban_members=True)
    async def ban(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, reason: str = "No reason"):
        await member.ban(reason=reason)
        embed = disnake.Embed(title="Banned", description=f"{member.mention} was banned.\n**Reason:** {reason}", color=0xFF3B5C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Unban a user")
    @commands.has_permissions(ban_members=True)
    async def unban(self, inter: disnake.ApplicationCommandInteraction, user_id: str):
        user = await self.bot.fetch_user(int(user_id))
        await inter.guild.unban(user)
        embed = disnake.Embed(title="Unbanned", description=f"{user.mention} was unbanned.", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Timeout a member")
    @commands.has_permissions(moderate_members=True)
    async def timeout(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, duration: int = 10, reason: str = "No reason"):
        await member.timeout(duration=duration * 60, reason=reason)
        embed = disnake.Embed(title="Timed Out", description=f"{member.mention} timed out for {duration} minutes.\n**Reason:** {reason}", color=0xFFAA00)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Remove timeout from a member")
    @commands.has_permissions(moderate_members=True)
    async def untimeout(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member):
        await member.timeout(duration=0)
        embed = disnake.Embed(title="Timeout Removed", description=f"{member.mention} timeout removed.", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Purge messages from a channel")
    @commands.has_permissions(manage_messages=True)
    async def purge(self, inter: disnake.ApplicationCommandInteraction, amount: int = 10):
        await inter.response.defer()
        deleted = await inter.channel.purge(limit=amount)
        await inter.followup.send(f"Deleted {len(deleted)} messages.", ephemeral=True)

    @commands.slash_command(description="Warn a member")
    @commands.has_permissions(manage_messages=True)
    async def warn(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, reason: str = "No reason"):
        embed = disnake.Embed(title="Warned", description=f"{member.mention} has been warned.\n**Reason:** {reason}", color=0xFFAA00)
        await inter.response.send_message(embed=embed)
        try:
            await member.send(f"You have been warned in **{inter.guild.name}**: {reason}")
        except Exception:
            pass

    @commands.slash_command(description="Set slowmode in a channel")
    @commands.has_permissions(manage_channels=True)
    async def slowmode(self, inter: disnake.ApplicationCommandInteraction, seconds: int = 0):
        await inter.channel.edit(slowmode_delay=seconds)
        await inter.response.send_message(f"Slowmode set to {seconds}s.", ephemeral=True)

    @commands.slash_command(description="Lock the current channel")
    @commands.has_permissions(manage_channels=True)
    async def lock(self, inter: disnake.ApplicationCommandInteraction):
        await inter.channel.set_permissions(inter.guild.default_role, send_messages=False)
        await inter.response.send_message("Channel locked.", ephemeral=True)

    @commands.slash_command(description="Unlock the current channel")
    @commands.has_permissions(manage_channels=True)
    async def unlock(self, inter: disnake.ApplicationCommandInteraction):
        await inter.channel.set_permissions(inter.guild.default_role, send_messages=True)
        await inter.response.send_message("Channel unlocked.", ephemeral=True)

    @commands.slash_command(description="Change a member's nickname")
    @commands.has_permissions(manage_nicknames=True)
    async def nick(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member, name: str):
        await member.edit(nick=name)
        await inter.response.send_message(f"Nickname changed to **{name}**.", ephemeral=True)


def setup(bot):
    bot.add_cog(Moderation(bot))
