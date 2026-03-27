// src/utils/presence.js
import { ActivityType } from 'discord.js';

export function setPresence(client, { status, type, name, url = null, emoji = '' }) {
  const activity = {
    type: ActivityType[type],
    name: `${emoji ? `${emoji} ` : ''}${name}`,
    ...(url && type === 'STREAMING' ? { url } : {})
  };
  client.user.setPresence({ activities: [activity], status });
}
