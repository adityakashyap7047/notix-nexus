import random
import time

import disnake
from disnake.ext import commands


class Economy(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.balances = {}
        self.cooldowns = {}
        self.jobs = [
            "hacked a bank", "sold crypto", "mined Bitcoin", "sold NFTs",
            "freelanced on Fiverr", "started a startup", "sold hot dogs",
            "drove Uber", "delivered pizza", "tutored students",
        ]

    def get_balance(self, user_id):
        return self.balances.get(str(user_id), 0)

    def add_balance(self, user_id, amount):
        uid = str(user_id)
        self.balances[uid] = self.balances.get(uid, 0) + amount

    def remove_balance(self, user_id, amount):
        uid = str(user_id)
        self.balances[uid] = max(0, self.balances.get(uid, 0) - amount)

    @commands.slash_command(description="Check your balance")
    async def balance(self, inter: disnake.ApplicationCommandInteraction, member: disnake.Member = None):
        member = member or inter.author
        bal = self.get_balance(member.id)
        embed = disnake.Embed(title="💰 Balance", color=0x00FF9C)
        embed.add_field(name="User", value=member.mention, inline=True)
        embed.add_field(name="Balance", value=f"**{bal:,}** coins", inline=True)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Claim your daily reward")
    async def daily(self, inter: disnake.ApplicationCommandInteraction):
        uid = str(inter.author.id)
        now = time.time()
        if uid in self.cooldowns and now - self.cooldowns[uid] < 86400:
            remaining = int(86400 - (now - self.cooldowns[uid]))
            hours = remaining // 3600
            mins = (remaining % 3600) // 60
            await inter.response.send_message(f"⏰ Wait {hours}h {mins}m before claiming daily again.", ephemeral=True)
            return
        amount = random.randint(100, 500)
        self.add_balance(inter.author.id, amount)
        self.cooldowns[uid] = now
        embed = disnake.Embed(title="🎁 Daily Reward", description=f"You earned **{amount:,}** coins!", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Work for coins")
    async def work(self, inter: disnake.ApplicationCommandInteraction):
        uid = str(inter.author.id)
        now = time.time()
        if uid in self.cooldowns and now - self.cooldowns[uid] < 3600:
            remaining = int(3600 - (now - self.cooldowns[uid]))
            await inter.response.send_message(f"⏰ Wait {remaining // 60}m before working again.", ephemeral=True)
            return
        job = random.choice(self.jobs)
        amount = random.randint(50, 300)
        self.add_balance(inter.author.id, amount)
        self.cooldowns[uid] = now
        embed = disnake.Embed(title="💼 Work", description=f"You {job} and earned **{amount:,}** coins!", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Beg for coins")
    async def beg(self, inter: disnake.ApplicationCommandInteraction):
        uid = str(inter.author.id)
        now = time.time()
        if uid in self.cooldowns and now - self.cooldowns[uid] < 60:
            await inter.response.send_message("⏰ Wait 1 minute before begging again.", ephemeral=True)
            return
        if random.random() < 0.5:
            amount = random.randint(1, 50)
            self.add_balance(inter.author.id, amount)
            embed = disnake.Embed(title="乞 Beg", description=f"Someone gave you **{amount}** coins!", color=0x00FF9C)
        else:
            embed = disnake.Embed(title="乞 Beg", description="Nobody gave you anything.", color=0xFF3B5C)
        self.cooldowns[uid] = now
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Deposit coins into your bank")
    async def deposit(self, inter: disnake.ApplicationCommandInteraction, amount: int):
        if self.get_balance(inter.author.id) < amount:
            await inter.response.send_message("❌ You don't have enough coins.", ephemeral=True)
            return
        self.remove_balance(inter.author.id, amount)
        self.add_balance(f"bank_{inter.author.id}", amount)
        embed = disnake.Embed(title="🏦 Deposited", description=f"Deposited **{amount:,}** coins.", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Withdraw coins from your bank")
    async def withdraw(self, inter: disnake.ApplicationCommandInteraction, amount: int):
        bank_key = f"bank_{inter.author.id}"
        if self.get_balance(bank_key) < amount:
            await inter.response.send_message("❌ You don't have enough in your bank.", ephemeral=True)
            return
        self.remove_balance(bank_key, amount)
        self.add_balance(inter.author.id, amount)
        embed = disnake.Embed(title="🏧 Withdrawn", description=f"Withdrew **{amount:,}** coins.", color=0x00FF9C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Spin the slots")
    async def slots(self, inter: disnake.ApplicationCommandInteraction, bet: int = 100):
        if self.get_balance(inter.author.id) < bet:
            await inter.response.send_message("❌ Not enough coins.", ephemeral=True)
            return
        self.remove_balance(inter.author.id, bet)
        symbols = ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣"]
        reels = [random.choice(symbols) for _ in range(3)]
        if reels[0] == reels[1] == reels[2]:
            winnings = bet * 10
        elif reels[0] == reels[1] or reels[1] == reels[2]:
            winnings = bet * 3
        else:
            winnings = 0
        self.add_balance(inter.author.id, winnings)
        display = " | ".join(reels)
        if winnings > 0:
            embed = disnake.Embed(title="🎰 Slots", description=f"`{display}`\n\nYou won **{winnings:,}** coins!", color=0x00FF9C)
        else:
            embed = disnake.Embed(title="🎰 Slots", description=f"`{display}`\n\nYou lost **{bet:,}** coins.", color=0xFF3B5C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="Coin flip bet")
    async def coinflip(self, inter: disnake.ApplicationCommandInteraction, choice: str, bet: int = 100):
        if choice.lower() not in ["heads", "tails"]:
            await inter.response.send_message("Choose heads or tails.", ephemeral=True)
            return
        if self.get_balance(inter.author.id) < bet:
            await inter.response.send_message("❌ Not enough coins.", ephemeral=True)
            return
        self.remove_balance(inter.author.id, bet)
        result = random.choice(["heads", "tails"])
        if choice.lower() == result:
            self.add_balance(inter.author.id, bet * 2)
            embed = disnake.Embed(title="🪙 Coin Flip", description=f"**{result.title()}!** You won **{bet * 2:,}** coins!", color=0x00FF9C)
        else:
            embed = disnake.Embed(title="🪙 Coin Flip", description=f"**{result.title()}!** You lost **{bet:,}** coins.", color=0xFF3B5C)
        await inter.response.send_message(embed=embed)

    @commands.slash_command(description="View the leaderboard")
    async def leaderboard(self, inter: disnake.ApplicationCommandInteraction):
        sorted_balances = sorted(self.balances.items(), key=lambda x: x[1], reverse=True)[:10]
        desc = ""
        for i, (uid, bal) in enumerate(sorted_balances, 1):
            if uid.startswith("bank_"):
                continue
            try:
                user = self.bot.get_user(int(uid))
                name = user.name if user else uid
            except Exception:
                name = uid
            desc += f"**{i}.** {name} — **{bal:,}** coins\n"
        embed = disnake.Embed(title="🏆 Leaderboard", description=desc or "No data yet.", color=0xFFAA00)
        await inter.response.send_message(embed=embed)


def setup(bot):
    bot.add_cog(Economy(bot))
