// src/index.js
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // charge .env

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

// --------- Chargement dynamique des commandes ----------
const commandsPath = new URL('./commands', import.meta.url);
for await (const file of fs.promises.readdir(commandsPath)) {
  if (!file.endsWith('.js')) continue;
  const { data, execute } = await import(`./commands/${file}`);
  client.commands.set(data.name, execute);
}

// --------- Register slash commands (global) ----------
client.once('ready', async () => {
  console.log(`${client.user.tag} prêt!`);
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: client.commands.map(cmd => cmd.data.toJSON()) }
    );
    console.log('Slash commands registered.');
  } catch (err) {
    console.error(err);
  }
});

// --------- Interaction handler ----------
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const execute = client.commands.get(interaction.commandName);
  if (!execute) return await interaction.reply({ content: '❌ Commande inconnue.', flags: 64 });
  try { await execute(interaction); } catch (err) {
    console.error(err);
    await interaction.reply({ content: '⚠️ Erreur interne.', flags: 64 });
  }
});

// src/index.js

const { config } = require('dotenv');
config(); // lit le fichier .env

const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.login(process.env.TOKEN);

