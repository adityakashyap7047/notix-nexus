import disnake
from disnake.ext import commands


class Welcome(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.welcome_settings = {}
        self.goodbye_settings = {}

    @commands.slash_command(description="Set welcome channel and message")
    @commands.has_permissions(manage_guild=True)
    async def setwelcome(self, inter: disnake.ApplicationCommandInteraction, channel: disnake.TextChannel, message: str = "Welcome {user} to {server}!"):
        self.welcome_settings[inter.guild.id] = {"channel": channel.id, "message": message}
        embed = disnake.Embed(title="✅ Welcome Set", description=f"Channel: {channel.mention}\nMessage: {message}", color=0x00FF9C)
        await inter.response.send_message(embed=embed, ephemeral=True)

    @commands.slash_command(description="Set goodbye channel and message")
    @commands.has_permissions(manage_guild=True)
    async def setgoodbye(self, inter: disnake.ApplicationCommandInteraction, channel: disnake.TextChannel, message: str = "Goodbye {user}!"):
        self.goodbye_settings[inter.guild.id] = {"channel": channel.id, "message": message}
        embed = disnake.Embed(title="✅ Goodbye Set", description=f"Channel: {channel.mention}\nMessage: {message}", color=0x00FF9C)
        await inter.response.send_message(embed=embed, ephemeral=True)

    @commands.Cog.listener()
    async def on_member_join(self, member):
        settings = self.welcome_settings.get(member.guild.id)
        if not settings:
            return
        channel = member.guild.get_channel(settings["channel"])
        if not channel:
            return
        msg = settings["message"].replace("{user}", member.mention).replace("{server}", member.guild.name)
        embed = disnake.Embed(title=f"Welcome to {member.guild.name}!", description=msg, color=0x00FF9C)
        embed.set_thumbnail(url=member.display_avatar.url)
        await channel.send(embed=embed)

    @commands.Cog.listener()
    async def on_member_remove(self, member):
        settings = self.goodbye_settings.get(member.guild.id)
        if not settings:
            return
        channel = member.guild.get_channel(settings["channel"])
        if not channel:
            return
        msg = settings["message"].replace("{user}", member.name).replace("{server}", member.guild.name)
        embed = disnake.Embed(title="Goodbye!", description=msg, color=0xFF3B5C)
        await channel.send(embed=embed)


def setup(bot):
    bot.add_cog(Welcome(bot))
