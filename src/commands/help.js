// src/commands/help.js
import { SlashCommandBuilder } from '@discordjs/builders';
import { buildEmbed } from '../utils/embed.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Affiche toutes les commandes disponibles.');

export async function execute(interaction) {
  const embed = buildEmbed(
    '🛠️ Bot Helper – Commandes',
    `
**/presence**  
> Met à jour le statut & l’activité du bot (online / idle / dnd, PLAYING / STREAMING / LISTENING / WATCHING).

**/blacklist add @user**  
> Ajoute un membre à la blacklist.

**/blacklist remove @user**  
> Supprime un membre de la blacklist.

**/blacklist list**  
> Liste tous les membres blacklisés.

Pour plus d’infos, utilisez la description intégrée après `/`.`
  );
  await interaction.reply({ embeds: [embed], flags: 64 });
}
