import disnake
from disnake.ext import commands


class Tickets(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.ticket_counter = 0
        self.active_tickets = {}

    @commands.slash_command(description="Create a support ticket")
    async def ticket(self, inter: disnake.ApplicationCommandInteraction, reason: str = "No reason"):
        self.ticket_counter += 1
        overwrites = {
            inter.guild.default_role: disnake.PermissionOverwrite(view_channel=False),
            inter.author: disnake.PermissionOverwrite(view_channel=True, send_messages=True),
            inter.guild.me: disnake.PermissionOverwrite(view_channel=True, send_messages=True),
        }
        channel = await inter.guild.create_text_channel(
            name=f"ticket-{self.ticket_counter}",
            overwrites=overwrites,
            category=None,
        )
        self.active_tickets[channel.id] = {"user": inter.author.id, "reason": reason}
        embed = disnake.Embed(
            title=f"🎫 Ticket #{self.ticket_counter}",
            description=f"**User:** {inter.author.mention}\n**Reason:** {reason}\n\nSupport will be with you shortly.",
            color=0x00F5FF,
        )
        await channel.send(embed=embed)
        await inter.response.send_message(f"Ticket created: {channel.mention}", ephemeral=True)

    @commands.slash_command(description="Close a ticket")
    @commands.has_permissions(manage_channels=True)
    async def closeticket(self, inter: disnake.ApplicationCommandInteraction):
        if inter.channel.id in self.active_tickets:
            del self.active_tickets[inter.channel.id]
            await inter.response.send_message("Closing ticket in 5 seconds...")
            import asyncio
            await asyncio.sleep(5)
            await inter.channel.delete()
        else:
            await inter.response.send_message("This is not a ticket channel.", ephemeral=True)


def setup(bot):
    bot.add_cog(Tickets(bot))
