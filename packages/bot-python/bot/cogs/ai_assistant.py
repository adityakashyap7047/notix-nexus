import os

import disnake
from disnake.ext import commands


class AIAssistant(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(description="Ask an AI character a question")
    async def ask(self, inter: disnake.ApplicationCommandInteraction, character: str = "nova", question: str = ""):
        if not question:
            await inter.response.send_message("Please provide a question.", ephemeral=True)
            return
        characters = {
            "nova": {"name": "NOVA", "color": 0x00F5FF, "desc": "Main AI Assistant"},
            "vex": {"name": "VEX", "color": 0xFF3B5C, "desc": "Security Expert"},
            "aria": {"name": "ARIA", "color": 0x8B5CF6, "desc": "Community Manager"},
            "kai": {"name": "KAI", "color": 0x3B82F6, "desc": "Developer"},
            "byte": {"name": "BYTE", "color": 0x00FF9C, "desc": "Economy Specialist"},
            "rune": {"name": "RUNE", "color": 0xFFAA00, "desc": "Moderation AI"},
            "nexus": {"name": "NEXUS", "color": 0x00F5FF, "desc": "Infrastructure AI"},
            "pixel": {"name": "PIXEL", "color": 0xFF69B4, "desc": "Gaming AI"},
        }
        char = characters.get(character.lower(), characters["nova"])
        embed = disnake.Embed(
            title=f"🤖 {char['name']} — {char['desc']}",
            description=f"**Question:** {question}\n\n*AI response requires API integration. Coming soon!*",
            color=char["color"],
        )
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="List all AI characters")
    async def characters(self, inter: disnake.ApplicationCommandInteraction):
        embed = disnake.Embed(title="🤖 AI Characters", color=0x00F5FF)
        chars = [
            ("NOVA", "Main AI Assistant", "0x00F5FF"),
            ("VEX", "Security Expert", "0xFF3B5C"),
            ("ARIA", "Community Manager", "0x8B5CF6"),
            ("KAI", "Developer", "0x3B82F6"),
            ("BYTE", "Economy Specialist", "0x00FF9C"),
            ("RUNE", "Moderation AI", "0xFFAA00"),
            ("NEXUS", "Infrastructure AI", "0x00F5FF"),
            ("PIXEL", "Gaming AI", "0xFF69B4"),
        ]
        for name, desc, color in chars:
            embed.add_field(name=name, value=desc, inline=True)
        await inter.response.send_message(embed=embed)


def setup(bot):
    bot.add_cog(AIAssistant(bot))
