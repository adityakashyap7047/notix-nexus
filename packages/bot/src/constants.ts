export const XP_PER_LEVEL = 100;
export const MAX_LEVEL = 100;
export const DAILY_STREAK_BONUS = 50;
export const TICKET_MAX = 5;
export const MAX_WARNINGS = 5;
export const COOLDOWN_DEFAULT = 3;

export const COLORS = {
  cyan: '#00F5FF',
  purple: '#8B5CF6',
  blue: '#3B82F6',
  green: '#00FF9C',
  red: '#FF3B5C',
  yellow: '#FBBF24',
  orange: '#F97316',
  dark: '#05070D',
  darker: '#080B12',
  darkest: '#0D111C',
  white: '#E2E8F0',
  grey: '#64748B',
} as const;

export const SHOP_ITEMS = [
  { id: 'vip_role', name: 'VIP Role', description: 'Get the VIP role', price: 5000, type: 'role' },
  { id: 'custom_color', name: 'Custom Name Color', description: 'Choose your name color', price: 2000, type: 'cosmetic' },
  { id: 'double_xp', name: 'Double XP (1h)', description: 'Double XP for 1 hour', price: 1500, type: 'consumable' },
  { id: 'nitro_boost', name: 'Nitro Boost Badge', description: 'Special badge on your profile', price: 10000, type: 'special' },
  { id: 'custom_emoji', name: 'Custom Emoji Slot', description: 'Add a custom emoji to the server', price: 3000, type: 'special' },
  { id: 'priority_support', name: 'Priority Support', description: 'Get faster support in tickets', price: 2500, type: 'role' },
] as const;
