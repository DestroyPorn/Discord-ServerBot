const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const allIntents = new Intents(32767);
const client = new Client({ intents:allIntents })
const config = require('./config.json')

const fs = require('fs');

//setup commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(file.split('.')[0], command);
}

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    try {
        await client.commands.get(interaction.commandName).execute(client, interaction);
  
    } catch (err) {
      interaction.reply({content:`> I catched an error: **${err}**\n \nNeed more help? Join support - https://discord.gg/memee`})
    }
    
  }
  if(interaction.isContextMenu()){
    const slashcmds = client.commands.get(interaction.commandName)
    if(!slashcmds) return;
    try {
      await slashcmds.run(client, interaction)
    } catch(e) {
      console.error(e)
    }
  }
});

client.on("ready", () => {
  console.log(`> The bot is online.`)
});

client.login(config.token)