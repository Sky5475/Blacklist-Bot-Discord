// src/commands/blacklist.js
import { SlashCommandBuilder } from '@discordjs/builders';
import {
  addToBlacklist,
  removeFromBlacklist,
  getBlacklisted
} from '../utils/db.js';

export const data = new SlashCommandBuilder()
  .setName('blacklist')
  .setDescription('Gestion de la blacklist.')
  .addSubcommand(sub => sub.setName('add')
    .addUserOption(o => o.setName('user').setRequired(true)
      .setDescription('Membre à bloquer')))
  .addSubcommand(sub => sub.setName('remove')
    .addUserOption(o => o.setName('user').setRequired(true)
      .setDescription('Membre à débloquer')))
  .addSubcommand(sub => sub.setName('list')
    .setDescription('Liste des membres bloqués'));

export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();

  if (sub === 'add') {
    const user = interaction.options.getUser('user');
    addToBlacklist(user.id, { name: user.username });
    return await interaction.reply({ content: `✅ ${user.tag} bloqué`, flags: 64 });
  }

  if (sub === 'remove') {
    const user = interaction.options.getUser('user');
    removeFromBlacklist(user.id);
    return await interaction.reply({ content: `✅ ${user.tag} débloqué`, flags: 64 });
  }

  // list
  const list = getBlacklisted();
  const msg = list.length ? list.map(u => `${u.id} – ${u.name}`).join('\n') : 'Aucun utilisateur bloqué.';
  await interaction.reply({ content: `\`\`\`${msg}\`\`\``, flags: 64 });
}
