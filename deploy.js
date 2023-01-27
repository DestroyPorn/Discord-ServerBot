const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	console.log(`> Loaded: ${file.replace(".js", "")}`)
}

const rest = new REST({ version: '9' }).setToken(config.token);

const clientId = config.clientId;

(async () => {
	try {
		console.log('> Started the process...');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('>> All commands have been reloaded');
	} catch (error) {
		console.error(error);
	}
})();