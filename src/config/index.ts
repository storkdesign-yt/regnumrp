// ================================
// REGNUM PANEL CONFIG
// ================================

export const CONFIG = {
  // Informacje o serwerze
  SERVER_NAME: 'Regnum',
  SERVER_DESCRIPTION: 'Dołącz do najlepszego serwera FiveM w Polsce!',
  SERVER_IP: 'connect regnum.pl',
  
  // Discord OAuth2
  DISCORD_CLIENT_ID: 'YOUR_DISCORD_CLIENT_ID',
  DISCORD_REDIRECT_URI: 'http://localhost:5173/auth/callback',
  
  // JSONBin API
  JSONBIN_API_KEY: 'YOUR_JSONBIN_API_KEY',
  JSONBIN_BIN_ID: 'YOUR_BIN_ID',
  
  // Discord Webhook
  DISCORD_WEBHOOK_URL: 'YOUR_WEBHOOK_URL',
  
  // Ustawienia aplikacji
  APPLICATION_COOLDOWN_DAYS: 7,
  MAX_PLAYERS: 64,
  
  // Social Media
  SOCIAL: {
    discord: 'https://discord.gg/regnum',
    tiktok: 'https://tiktok.com/@regnum',
    instagram: 'https://instagram.com/regnum',
  },
  
  // Frakcje domyślne
  DEFAULT_FACTIONS: [
    {
      id: 'lspd',
      name: 'lspd',
      displayName: 'LSPD',
      description: 'Los Santos Police Department',
      icon: 'ri-police-car-line',
      color: '#3b82f6',
      isActive: true,
    },
    {
      id: 'ems',
      name: 'ems',
      displayName: 'EMS',
      description: 'Emergency Medical Services',
      icon: 'ri-heart-pulse-line',
      color: '#ef4444',
      isActive: true,
    },
    {
      id: 'lssd',
      name: 'lssd',
      displayName: 'LSSD',
      description: 'Los Santos Sheriff Department',
      icon: 'ri-shield-star-line',
      color: '#eab308',
      isActive: true,
    },
  ],
  
  // Pytania domyślne dla podań
  DEFAULT_QUESTIONS: [
    {
      id: 'q1',
      type: 'text' as const,
      question: 'Podaj swój wiek',
      placeholder: 'np. 18',
      required: true,
      order: 1,
    },
    {
      id: 'q2',
      type: 'text' as const,
      question: 'Ile czasu możesz poświęcić dziennie na grę?',
      placeholder: 'np. 3-4 godziny',
      required: true,
      order: 2,
    },
    {
      id: 'q3',
      type: 'textarea' as const,
      question: 'Dlaczego chcesz dołączyć do tej frakcji?',
      placeholder: 'Opisz swoją motywację...',
      required: true,
      order: 3,
    },
    {
      id: 'q4',
      type: 'textarea' as const,
      question: 'Opisz swoją dotychczasową przygodę z roleplay',
      placeholder: 'Twoje doświadczenie...',
      required: true,
      order: 4,
    },
    {
      id: 'q5',
      type: 'select' as const,
      question: 'Jakie jest Twoje doświadczenie z FiveM?',
      required: true,
      options: ['Początkujący', 'Średniozaawansowany', 'Zaawansowany'],
      order: 5,
    },
  ],
  
  // Role i uprawnienia
  ROLES: {
    administrator: {
      name: 'Administrator',
      permissions: [
        'view_applications',
        'manage_applications',
        'view_players',
        'manage_players',
        'manage_blacklist',
        'view_logs',
        'manage_settings',
        'manage_admins',
        'manage_factions',
      ],
    },
    moderator: {
      name: 'Moderator',
      permissions: [
        'view_applications',
        'manage_applications',
        'view_players',
        'manage_players',
        'manage_blacklist',
        'view_logs',
      ],
    },
    support: {
      name: 'Support',
      permissions: [
        'view_applications',
        'view_players',
        'view_logs',
      ],
    },
  },
};

// Helper functions
export const getDiscordAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CONFIG.DISCORD_CLIENT_ID,
    redirect_uri: CONFIG.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email',
  });
  
  return `https://discord.com/api/oauth2/authorize?${params}`;
};

export const hasPermission = (userPermissions: string[], required: string) => {
  return userPermissions.includes(required);
};

export const hasAnyPermission = (userPermissions: string[], required: string[]) => {
  return required.some(perm => userPermissions.includes(perm));
};
