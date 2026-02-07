import { create } from 'zustand';
import type { 
  User, 
  Application, 
  Player, 
  AuditLog, 
  Settings, 
  ServerStatus,
  DashboardStats,
  Notification,
  Faction,
  ChangelogEntry
} from '@/types';

// ================================
// AUTH STORE
// ================================

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (userData) => set((state) => ({
    user: state.user ? { ...state.user, ...userData } : null
  })),
}));

// ================================
// APPLICATIONS STORE
// ================================

interface ApplicationsState {
  applications: Application[];
  isLoading: boolean;
  setApplications: (applications: Application[]) => void;
  addApplication: (application: Application) => void;
  updateApplication: (id: string, data: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],
  isLoading: true,
  setApplications: (applications) => set({ applications, isLoading: false }),
  addApplication: (application) => set((state) => ({
    applications: [application, ...state.applications]
  })),
  updateApplication: (id, data) => set((state) => ({
    applications: state.applications.map(app => 
      app.id === id ? { ...app, ...data } : app
    )
  })),
  deleteApplication: (id) => set((state) => ({
    applications: state.applications.filter(app => app.id !== id)
  })),
}));

// ================================
// PLAYERS STORE
// ================================

interface PlayersState {
  players: Player[];
  isLoading: boolean;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, data: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
}

export const usePlayersStore = create<PlayersState>((set) => ({
  players: [],
  isLoading: true,
  setPlayers: (players) => set({ players, isLoading: false }),
  addPlayer: (player) => set((state) => ({
    players: [player, ...state.players]
  })),
  updatePlayer: (id, data) => set((state) => ({
    players: state.players.map(p => 
      p.id === id ? { ...p, ...data } : p
    )
  })),
  deletePlayer: (id) => set((state) => ({
    players: state.players.filter(p => p.id !== id)
  })),
}));

// ================================
// LOGS STORE
// ================================

interface LogsState {
  logs: AuditLog[];
  isLoading: boolean;
  setLogs: (logs: AuditLog[]) => void;
  addLog: (log: AuditLog) => void;
}

export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  isLoading: true,
  setLogs: (logs) => set({ logs, isLoading: false }),
  addLog: (log) => set((state) => ({
    logs: [log, ...state.logs]
  })),
}));

// ================================
// SETTINGS STORE
// ================================

interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  setSettings: (settings: Settings) => void;
  updateSettings: (data: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: true,
  setSettings: (settings) => set({ settings, isLoading: false }),
  updateSettings: (data) => set((state) => ({
    settings: state.settings ? { ...state.settings, ...data } : null
  })),
}));

// ================================
// SERVER STATUS STORE
// ================================

interface ServerStatusState {
  status: ServerStatus;
  setStatus: (status: ServerStatus) => void;
}

export const useServerStatusStore = create<ServerStatusState>((set) => ({
  status: { online: false, players: 0, maxPlayers: 64 },
  setStatus: (status) => set({ status }),
}));

// ================================
// DASHBOARD STATS STORE
// ================================

interface DashboardStatsState {
  stats: DashboardStats | null;
  isLoading: boolean;
  setStats: (stats: DashboardStats) => void;
}

export const useDashboardStatsStore = create<DashboardStatsState>((set) => ({
  stats: null,
  isLoading: true,
  setStats: (stats) => set({ stats, isLoading: false }),
}));

// ================================
// NOTIFICATIONS STORE
// ================================

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      }
    ]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  clearNotifications: () => set({ notifications: [] }),
}));

// ================================
// FACTIONS STORE
// ================================

interface FactionsState {
  factions: Faction[];
  isLoading: boolean;
  setFactions: (factions: Faction[]) => void;
  addFaction: (faction: Faction) => void;
  updateFaction: (id: string, data: Partial<Faction>) => void;
  deleteFaction: (id: string) => void;
}

export const useFactionsStore = create<FactionsState>((set) => ({
  factions: [],
  isLoading: true,
  setFactions: (factions) => set({ factions, isLoading: false }),
  addFaction: (faction) => set((state) => ({
    factions: [...state.factions, faction]
  })),
  updateFaction: (id, data) => set((state) => ({
    factions: state.factions.map(f => 
      f.id === id ? { ...f, ...data } : f
    )
  })),
  deleteFaction: (id) => set((state) => ({
    factions: state.factions.filter(f => f.id !== id)
  })),
}));

// ================================
// CHANGELOG STORE
// ================================

interface ChangelogState {
  entries: ChangelogEntry[];
  isLoading: boolean;
  setEntries: (entries: ChangelogEntry[]) => void;
  addEntry: (entry: ChangelogEntry) => void;
  updateEntry: (id: string, data: Partial<ChangelogEntry>) => void;
  deleteEntry: (id: string) => void;
}

export const useChangelogStore = create<ChangelogState>((set) => ({
  entries: [],
  isLoading: true,
  setEntries: (entries) => set({ entries, isLoading: false }),
  addEntry: (entry) => set((state) => ({
    entries: [entry, ...state.entries]
  })),
  updateEntry: (id, data) => set((state) => ({
    entries: state.entries.map(e => 
      e.id === id ? { ...e, ...data } : e
    )
  })),
  deleteEntry: (id) => set((state) => ({
    entries: state.entries.filter(e => e.id !== id)
  })),
}));
