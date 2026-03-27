// src/utils/embed.js
import { EmbedBuilder, Colors } from 'discord.js';

export function buildEmbed(title, description) {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(Colors.Blue);
}
