// ================================
// TYPE DEFINITIONS - REGNUM
// ================================

export interface User {
  id: string;
  discordId: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: string;
}

export type UserRole = 'administrator' | 'moderator' | 'support' | 'user';

export type Permission = 
  | 'view_applications'
  | 'manage_applications'
  | 'view_players'
  | 'manage_players'
  | 'manage_blacklist'
  | 'view_logs'
  | 'manage_settings'
  | 'manage_admins'
  | 'manage_factions';

export interface Application {
  id: string;
  userId: string;
  username: string;
  discordId: string;
  faction: string;
  status: ApplicationStatus;
  answers: ApplicationAnswer[];
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  notes?: string;
}

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface ApplicationAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface Faction {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  questions: Question[];
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  order: number;
}

export type QuestionType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';

export interface Player {
  id: string;
  discordId: string;
  username: string;
  isBlacklisted: boolean;
  blacklistReason?: string;
  blacklistedAt?: string;
  blacklistedBy?: string;
  cooldownUntil?: string;
  notes?: string;
  applicationHistory: string[];
}

export interface AuditLog {
  id: string;
  action: AuditAction;
  performedBy: string;
  performedByUsername: string;
  targetId?: string;
  targetType?: string;
  details: string;
  timestamp: string;
}

export type AuditAction = 
  | 'application_accepted'
  | 'application_rejected'
  | 'player_blacklisted'
  | 'player_unblacklisted'
  | 'cooldown_set'
  | 'cooldown_removed'
  | 'admin_added'
  | 'admin_removed'
  | 'settings_updated'
  | 'faction_created'
  | 'faction_updated'
  | 'faction_deleted';

export interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
}

export interface Settings {
  serverName: string;
  serverDescription: string;
  serverIp: string;
  discordWebhook: string;
  applicationCooldown: number; // in days
  enableGiveaway: boolean;
  giveawayTitle?: string;
  giveawayEndDate?: string;
  enableChangelog: boolean;
}

export interface ChangelogEntry {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'fix' | 'important';
  date: string;
}

export interface Giveaway {
  id: string;
  title: string;
  description: string;
  endDate: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  totalPlayers: number;
  blacklistedPlayers: number;
  applicationsToday: number;
  applicationsThisWeek: number;
  acceptanceRate: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}
