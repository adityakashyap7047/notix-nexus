"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export interface Guild {
  id: string;
  name: string;
  icon?: string;
  memberCount?: number;
  role?: string;
  permissions?: number;
}

export interface User {
  id: string;
  username: string;
  avatar?: string | null;
  tag?: string;
  email?: string | null;
  guilds: Guild[];
}

interface AuthContextType {
  user: User | null;
  selectedGuild: Guild | null;
  setSelectedGuild: (guild: Guild | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const defaultGuilds: Guild[] = [
  { id: "109876543210987654", name: "NOTIX NEXUS HQ", icon: "⚡", memberCount: 24891, role: "Owner" },
  { id: "209876543210987654", name: "Cyber Lounge", icon: "🌐", memberCount: 8420, role: "Admin" },
  { id: "309876543210987654", name: "Shadow Realm", icon: "🎮", memberCount: 1350, role: "Moderator" },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(defaultGuilds[0]);
  const [user, setUser] = useState<User | null>(null);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" || process.env.NODE_ENV === "development";

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as any).id || "user_nexus",
        username: session.user.name || "CyberAgent",
        email: session.user.email,
        avatar: session.user.image,
        guilds: defaultGuilds,
      });
    } else if (process.env.NODE_ENV === "development") {
      setUser({
        id: "dev_agent",
        username: "NexusAdmin",
        avatar: null,
        guilds: defaultGuilds,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = () => signIn("discord");
  const logout = () => signOut({ callbackUrl: "/" });

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedGuild,
        setSelectedGuild,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: {
        id: "guest",
        username: "Guest",
        avatar: null,
        guilds: defaultGuilds,
      },
      selectedGuild: defaultGuilds[0],
      setSelectedGuild: () => {},
      isAuthenticated: true,
      isLoading: false,
      login: () => {},
      logout: () => {},
    };
  }
  return context;
}
