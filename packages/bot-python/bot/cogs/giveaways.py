import asyncio
import random
import time

import disnake
from disnake.ext import commands


class Giveaways(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.active_giveaways = {}

    @commands.slash_command(description="Start a giveaway")
    @commands.has_permissions(manage_guild=True)
    async def giveaway(self, inter: disnake.ApplicationCommandInteraction, prize: str, duration: int = 60, winners: int = 1):
        embed = disnake.Embed(
            title="🎉 GIVEAWAY",
            description=f"**Prize:** {prize}\n**Duration:** {duration}s\n**Winners:** {winners}\n\nReact with 🎉 to enter!",
            color=0xFFAA00,
            timestamp=disnake.utils.utcnow(),
        )
        await inter.response.send_message(embed=embed)
        msg = await inter.original_response()
        await msg.add_reaction("🎉")
        self.active_giveaways[msg.id] = {
            "prize": prize,
            "winners": winners,
            "end_time": time.time() + duration,
            "channel": inter.channel,
            "message": msg,
        }
        await asyncio.sleep(duration)
        if msg.id not in self.active_giveaways:
            return
        del self.active_giveaways[msg.id]
        msg = await inter.channel.fetch_message(msg.id)
        reaction = None
        for r in msg.reactions:
            if str(r.emoji) == "🎉":
                reaction = r
                break
        if not reaction or reaction.count <= 1:
            await inter.channel.send("No entries — giveaway cancelled.")
            return
        users = [u async for u in reaction.users() if not u.bot]
        if not users:
            await inter.channel.send("No valid entries — giveaway cancelled.")
            return
        w_count = min(winners, len(users))
        chosen = random.sample(users, w_count)
        mentions = ", ".join(u.mention for u in chosen)
        embed = disnake.Embed(
            title="🎉 GIVEAWAY ENDED",
            description=f"**Prize:** {prize}\n**Winner(s):** {mentions}",
            color=0x00FF9C,
        )
        await inter.channel.send(embed=embed)


def setup(bot):
    bot.add_cog(Giveaways(bot))
