// src/commands/presence.js
import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits, ActivityType } from 'discord.js';
import { setPresence } from '../utils/presence.js';

export const data = new SlashCommandBuilder()
  .setName('presence')
  .setDescription('Met à jour la présence du bot.')
  .addStringOption(o => o.setName('status').setRequired(true)
    .addChoices({ name: 'Online', value: 'online' },
                { name: 'Idle', value: 'idle' },
                { name: 'Do Not Disturb', value: 'dnd' }))
  .addStringOption(o => o.setName('type').setRequired(true)
    .addChoices({ name: 'Playing', value: 'PLAYING' },
                { name: 'Streaming', value: 'STREAMING' },
                { name: 'Listening', value: 'LISTENING' },
                { name: 'Watching', value: 'WATCHING' }))
  .addStringOption(o => o.setName('name').setRequired(true)
    .setDescription('Nom de l’activité'))
  .addStringOption(o => o.setName('url')
    .setDescription('URL pour STREAMING (obligatoire si type=STREAMING)'))
  .addStringOption(o => o.setName('emoji')
    .setDescription('Emoji à afficher devant le nom, optionnel'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  const status = interaction.options.getString('status');
  const type = interaction.options.getString('type');
  const name = interaction.options.getString('name');
  const url = interaction.options.getString('url');
  const emoji = interaction.options.getString('emoji') ?? '';

  if (type === 'STREAMING' && !url) {
    return await interaction.reply({ content: '❌ URL obligatoire pour STREAMING', flags: 64 });
  }

  setPresence(interaction.client, { status, type, name, url, emoji });

  await interaction.reply({ content: `✅ Presence mise à jour (${type} – ${status})`, flags: 64 });
}
